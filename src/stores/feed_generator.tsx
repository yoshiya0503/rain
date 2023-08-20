import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

export interface FeedGeneratorSlice {
  feedGenerators: AppBskyFeedDefs.GeneratorView[];
  feedGenerator?: AppBskyFeedDefs.GeneratorView;
  feedGeneratorCursor: string;
  feedCursor: string;
  feedBrief: AppBskyFeedDefs.FeedViewPost[];
  feed: AppBskyFeedDefs.FeedViewPost[];
  getFeedGenerators: (query: string) => Promise<void>;
  getFeedGenerator: (feed: string) => Promise<void>;
  getFeedBrief: (feed: string) => Promise<void>;
  getFeed: (feed: string, isReset: boolean) => Promise<void>;
}

export const createFeedGeneratorSlice: StateCreator<FeedGeneratorSlice & MessageSlice, [], [], FeedGeneratorSlice> = (
  set,
  get
) => ({
  feedGenerator: undefined,
  feedGenerators: [],
  feedBrief: [],
  feed: [],
  feedGeneratorCursor: "",
  feedCursor: "",
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
  getFeedGenerator: async (feed: string) => {
    try {
      const res = await agent.api.app.bsky.feed.getFeedGenerator({ feed });
      set({ feedGenerator: res.data.view });
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
  getFeed: async (feed: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().feedCursor;
      const res = await agent.api.app.bsky.feed.getFeed({ feed, cursor });
      if (isReset) {
        set({ feed: res.data.feed, feedCursor: res.data.cursor });
      } else {
        const feed = _.concat(get().feed, res.data.feed);
        set({ feed, feedCursor: res.data.cursor });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to fetch feed" }, e);
    }
  },
});
