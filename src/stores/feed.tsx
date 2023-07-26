import { StateCreator } from "zustand";
import _ from "lodash";
import { MessageSlice } from "@/stores/message";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import agent from "@/agent";

export type PostView = AppBskyFeedDefs.PostView & {
  // record?: AppBskyFeedPost.Record | object;
  record: any;
};

export type Record = Partial<AppBskyFeedPost.Record> & Omit<AppBskyFeedPost.Record, "createdAt">;

export interface FeedSlice {
  feed: AppBskyFeedDefs.FeedViewPost[];
  authorFeed: AppBskyFeedDefs.FeedViewPost[];
  cursor: string;
  authorCursor: string;
  getTimeline: () => Promise<void>;
  getInitialTimeline: () => Promise<void>;
  getAuthorFeed: (actor: string, isReset: boolean) => Promise<void>;
  post: (record: Record) => Promise<void>;
  deletePost: (record: PostView) => Promise<void>;
  repost: (record: PostView) => Promise<void>;
  deleteRepost: (record: PostView) => Promise<void>;
  like: (record: PostView) => Promise<void>;
  deleteLike: (record: PostView) => Promise<void>;
}

export const createFeedSlice: StateCreator<FeedSlice & MessageSlice, [], [], FeedSlice> = (set, get) => ({
  cursor: "",
  authorCursor: "",
  feed: [],
  authorFeed: [],
  getTimeline: async () => {
    try {
      const res = await agent.getTimeline({ cursor: get().cursor });
      if (get().cursor === res.data.cursor) return; // react 18
      const computedFeed = _.filter(res.data.feed, (f) => {
        if (f.post.author?.did === "did:plc:4hqjfn7m6n5hno3doamuhgef") return false;
        return !f.reply;
      });
      const feed = _.concat(get().feed, computedFeed);
      set({ feed, cursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  getInitialTimeline: async () => {
    while (_.size(get().feed) < 10) {
      await get().getTimeline();
    }
  },
  getAuthorFeed: async (actor: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().authorCursor;
      const res = await agent.getAuthorFeed({ actor, cursor });
      if (get().authorCursor === res.data.cursor) return; // react 18
      if (isReset) {
        set({ authorFeed: res.data.feed, authorCursor: res.data.cursor });
      } else {
        const authorFeed = _.concat(get().authorFeed, res.data.feed);
        set({ authorFeed, authorCursor: res.data.cursor });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  post: async (record: Record) => {
    try {
      await agent.post(record);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to post" }, e);
    }
  },
  deletePost: async (post: PostView) => {
    try {
      // delete Postが遅いので先にUIから削除する
      const feed = _.reject(get().feed, (f) => {
        return f.post.uri === post.uri;
      });
      set({ feed: feed });
      await agent.deletePost(post.uri);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to post" }, e);
    }
  },
  repost: async (post: PostView) => {
    try {
      const res = await agent.repost(post.uri, post.cid);
      const feed = _.map(get().feed, (f) => {
        if (f.post.uri === post.uri) {
          f.post.viewer = { ...f.post.viewer, repost: res.uri };
          return f;
        }
        return f;
      });
      set({ feed: feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  deleteRepost: async (post: PostView) => {
    try {
      await agent.deleteRepost(post.viewer?.repost || "");
      const feed = _.map(get().feed, (f) => {
        if (f.post.uri === post.uri) {
          f.post.viewer = _.omit(f.post.viewer, "repost");
          return f;
        }
        return f;
      });
      set({ feed: feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  like: async (post: PostView) => {
    try {
      const res = await agent.like(post.uri, post.cid);
      const feed = _.map(get().feed, (f) => {
        if (f.post.uri === post.uri) {
          f.post.viewer = { ...f.post.viewer, like: res.uri };
          return f;
        }
        return f;
      });
      set({ feed: feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
  deleteLike: async (post: PostView) => {
    try {
      await agent.deleteLike(post.viewer?.like || "");
      const feed = _.map(get().feed, (f) => {
        if (f.post.uri === post.uri) {
          f.post.viewer = _.omit(f.post.viewer, "like");
          return f;
        }
        return f;
      });
      set({ feed: feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
});
