import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyActorProfile } from "@atproto/api";
import agent from "@/agent";

export interface ActorSlice {
  me?: AppBskyActorDefs.ProfileViewDetailed;
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  authorFeed: AppBskyFeedDefs.FeedViewPost[];
  authorCursor: string;
  suggestions?: AppBskyActorDefs.ProfileViewDetailed[];
  getMe: () => Promise<void>;
  getProfile: (actor: string) => Promise<void>;
  getAuthorFeed: (actor: string, isReset: boolean) => Promise<void>;
  getSuggestions: () => Promise<void>;
  updateProfile: (record: AppBskyActorProfile.Record) => Promise<void>;
  updateAuthorFeedViewer: (post: AppBskyFeedDefs.PostView) => void;
}

export const createActorSlice: StateCreator<ActorSlice & MessageSlice & SessionSlice, [], [], ActorSlice> = (
  set,
  get
) => ({
  actor: undefined,
  me: undefined,
  authorCursor: "",
  authorFeed: [],
  suggestions: undefined,
  getMe: async () => {
    try {
      const session = get().session;
      const res = await agent.getProfile({ actor: session?.did || "" });
      set({ me: res.data });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch profile" }, e);
    }
  },
  getProfile: async (actor: string) => {
    try {
      const res = await agent.getProfile({ actor });
      set({ actor: res.data });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch profile" }, e);
    }
  },
  getAuthorFeed: async (actor: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().authorCursor;
      const res = await agent.getAuthorFeed({ actor, cursor });
      if (isReset) {
        set({ authorFeed: res.data.feed, authorCursor: res.data.cursor });
      } else {
        const authorFeed = _.concat(get().authorFeed, res.data.feed);
        set({ authorFeed, authorCursor: res.data.cursor });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch timeline" }, e);
    }
  },
  getSuggestions: async () => {
    try {
      const res = await agent.getSuggestions();
      set({ suggestions: res.data.actors });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch suggestions" }, e);
    }
  },
  updateProfile: async (record: AppBskyActorProfile.Record) => {
    try {
      await agent.upsertProfile(async (existing?: AppBskyActorProfile.Record) => {
        return { ...existing, ..._.omitBy(record, _.isEmpty) };
      });
      await get().getMe();
      await get().getProfile(get().me?.handle || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed update profile" }, e);
    }
  },
  updateAuthorFeedViewer: (post: AppBskyFeedDefs.PostView) => {
    const authorFeed = _.map(get().authorFeed, (f) => {
      if (AppBskyFeedDefs.isPostView(f.reply?.root)) {
        if (f.reply?.root.uri === post.uri) {
          f.reply.root = post;
        }
      }
      if (AppBskyFeedDefs.isPostView(f.reply?.parent)) {
        if (f.reply?.parent.uri === post.uri) {
          f.reply.parent = post;
        }
      }
      if (f.post.uri === post.uri) {
        f.post = post;
      }
      return f;
    });
    set({ authorFeed });
  },
});
