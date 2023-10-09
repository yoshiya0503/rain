import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyActorDefs, AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

const SEARCH_URI = "https://search.bsky.social/search";

export interface SearchSlice {
  searchedKeyword: string;
  searchedActors: AppBskyActorDefs.ProfileView[];
  searchedPosts: AppBskyFeedDefs.PostView[];
  searchPost: (q: string) => Promise<void>;
  searchActor: (q: string) => Promise<void>;
  updateSearchViewer: (post: AppBskyFeedDefs.PostView) => void;
}

export const createSearchSlice: StateCreator<SearchSlice & MessageSlice, [], [], SearchSlice> = (set, get) => ({
  searchedKeyword: "",
  searchedActors: [],
  searchedPosts: [],
  searchPost: async (q: string) => {
    try {
      if (!q) return;
      const searched = await fetch(`${SEARCH_URI}/posts?q=${q}`);
      const result = await searched.json();
      if (result.error) throw Error();
      const uris = _.chain(result)
        .map((item) => `at://${item.user.did}/${item.tid}`)
        .take(25)
        .value();
      if (_.isEmpty(uris)) {
        set({ searchedKeyword: q });
        return;
      }
      const res = await agent.getPosts({ uris });
      set({ searchedPosts: res.data.posts, searchedKeyword: q });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to search actor URIs" }, e);
    }
  },
  searchActor: async (q: string) => {
    try {
      if (!q) return;
      const searched = await fetch(`${SEARCH_URI}/profiles?q=${q}`);
      const result = await searched.json();
      if (result.error) throw Error();
      const actors = _.chain(result)
        .map((item) => item.did)
        .take(25)
        .value();
      if (_.isEmpty(actors)) {
        set({ searchedKeyword: q });
        return;
      }
      const res = await agent.getProfiles({ actors });
      set({ searchedActors: res.data.profiles, searchedKeyword: q });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to search post URIs" }, e);
    }
  },
  updateSearchViewer: (post: AppBskyFeedDefs.PostView) => {
    const searchedPosts = _.map(get().searchedPosts, (subject) => (subject.uri === post.uri ? post : subject));
    set({ searchedPosts });
  },
});
