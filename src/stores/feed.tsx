import { StateCreator } from "zustand";
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
      const res = await agent.getTimeline({ limit: 100 });
      set({ feed: res.data.feed, cursor: res.data.cursor });
    } catch (e) {
      console.log(e);
    }
  },
  post: async () => {
    return;
  },
});
