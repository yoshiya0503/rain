import { StateCreator } from "zustand";
import _ from "lodash";
import { MessageSlice } from "@/stores/message";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import agent from "@/agent";

export interface FeedSlice {
  feed: AppBskyFeedDefs.FeedViewPost[];
  authorFeed: AppBskyFeedDefs.FeedViewPost[];
  cursor: string;
  authorCursor: string;
  getTimeline: () => Promise<void>;
  getAuthorFeed: (actor: string) => Promise<void>;
  post: (record: AppBskyFeedPost.Record) => Promise<void>;
}

export const createFeedSlice: StateCreator<FeedSlice & MessageSlice, [], [], FeedSlice> = (set, get) => ({
  cursor: "",
  authorCursor: "",
  feed: [],
  authorFeed: [],
  getTimeline: async () => {
    try {
      const res = await agent.getTimeline({ cursor: get().cursor });
      agent.api.app.bsky.graph.block
      const computedFeed = _.filter(res.data.feed, (f) => {
        // TODO filter yui
        return true;
      });
      const feed = _.concat(get().feed, computedFeed);
      set({ feed, cursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  getAuthorFeed: async (actor: string) => {
    try {
      const res = await agent.getAuthorFeed({ actor, cursor: get().cursor });
      const authorFeed = _.concat(get().authorFeed, res.data.feed);
      set({ authorFeed, authorCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  post: async (record: AppBskyFeedPost.Record) => {
    try {
      await agent.post({ text: record.text });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to post" }, e);
    }
  },
});
