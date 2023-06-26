import { StateCreator } from "zustand";
import _ from "lodash";
import { MessageSlice } from "@/stores/message";
import { AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

export interface FeedSlice {
  feed: AppBskyFeedDefs.FeedViewPost[];
  cursor: string;
  getTimeline: () => Promise<void>;
  post: () => Promise<void>;
}

export const createFeedSlice: StateCreator<FeedSlice & MessageSlice, [], [], FeedSlice> = (set, get) => ({
  cursor: "",
  feed: [],
  getTimeline: async () => {
    try {
      const res = await agent.getTimeline({ cursor: get().cursor });
      const feed = _.concat(get().feed, res.data.feed);
      set({ feed, cursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  post: async () => {
    return;
  },
});
