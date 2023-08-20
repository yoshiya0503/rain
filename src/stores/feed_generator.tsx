import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

export interface FeedGeneratorSlice {
  feedGenerators: AppBskyFeedDefs.GeneratorView[];
  feedGeneratorCursor: string;
  feedBrief: AppBskyFeedDefs.FeedViewPost[];
  getFeedGenerators: (query: string) => Promise<void>;
  getFeedBrief: (did: string) => Promise<void>;
}

export const createFeedGeneratorSlice: StateCreator<FeedGeneratorSlice & MessageSlice, [], [], FeedGeneratorSlice> = (
  set,
  get
) => ({
  feedGenerators: [],
  feedBrief: [],
  feedGeneratorCursor: "",
  getFeedGenerators: async (query: string) => {
    try {
      const res = await agent.api.app.bsky.unspecced.getPopularFeedGenerators({
        query,
        limit: 50,
        cursor: get().feedGeneratorCursor,
      });
      set({ feedGenerators: res.data.feeds, feedGeneratorCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to fetch feeds" }, e);
    }
  },
  getFeedBrief: async (feed: string) => {
    try {
      set({ feedBrief: [] });
      const res = await agent.api.app.bsky.feed.getFeed({ limit: 5, feed });
      set({ feedBrief: res.data.feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to fetch brief" }, e);
    }
  },
});
