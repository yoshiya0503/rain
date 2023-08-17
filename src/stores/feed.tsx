import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyFeedDefs, AppBskyFeedPost, ComAtprotoRepoUploadBlob } from "@atproto/api";
import agent from "@/agent";

export type Record = Partial<AppBskyFeedPost.Record> & Omit<AppBskyFeedPost.Record, "createdAt">;
export type BlobRequest = ComAtprotoRepoUploadBlob.InputSchema;
export type BlobResponse = ComAtprotoRepoUploadBlob.OutputSchema;

export interface FeedSlice {
  feed: AppBskyFeedDefs.FeedViewPost[];
  cursor: string;
  filterFeed: (feed: AppBskyFeedDefs.FeedViewPost[]) => AppBskyFeedDefs.FeedViewPost[];
  getTimeline: () => Promise<void | boolean>;
  getInitialTimeline: () => Promise<void>;
  uploadBlob: (data: BlobRequest) => Promise<BlobResponse | undefined>;
  post: (record: Record) => Promise<void>;
  deletePost: (record: AppBskyFeedDefs.PostView) => Promise<void>;
  repost: (record: AppBskyFeedDefs.PostView) => Promise<void | { cid: string; uri: string }>;
  deleteRepost: (record: AppBskyFeedDefs.PostView) => Promise<void>;
  like: (record: AppBskyFeedDefs.PostView) => Promise<void | { cid: string; uri: string }>;
  deleteLike: (record: AppBskyFeedDefs.PostView) => Promise<void>;
  updateFeedViewer: (post: AppBskyFeedDefs.PostView) => void;
}

export const createFeedSlice: StateCreator<FeedSlice & MessageSlice & SessionSlice, [], [], FeedSlice> = (
  set,
  get
) => ({
  cursor: "",
  authorCursor: "",
  feed: [],
  authorFeed: [],
  getTimeline: async () => {
    try {
      const res = await agent.getTimeline({ cursor: get().cursor, limit: 100 });
      if (!res.data.cursor) return true;
      const filteredFeed = get().filterFeed(res.data.feed);
      const feed = _.concat(get().feed, filteredFeed);
      set({ feed, cursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  filterFeed: (feed: AppBskyFeedDefs.FeedViewPost[]) => {
    let filterList: string[] = [];
    return _.chain(feed)
      .reject((f) => {
        return AppBskyFeedDefs.isReasonRepost(f.reason) && f.reason.by.did === get().session?.did;
      })
      .filter((f) => {
        if (_.includes(filterList, f.post.cid)) {
          return false;
        }
        if (f.reply) {
          if (AppBskyFeedDefs.isPostView(f.reply.root)) {
            filterList = _.concat(filterList, f.reply.root.cid);
          }
          if (AppBskyFeedDefs.isPostView(f.reply.parent)) {
            filterList = _.concat(filterList, f.reply.parent.cid);
          }
        }
        return true;
      })
      .value();
  },
  getInitialTimeline: async () => {
    let isLastOrder;
    while (_.size(get().feed) < 10 && !isLastOrder) {
      isLastOrder = await get().getTimeline();
    }
  },
  post: async (record: Record) => {
    try {
      const postResponse = await agent.post(record);
      const res = await agent.getPosts({ uris: [postResponse.uri] });
      // 初めてpostした場合、長さ1のリストになってTLが取れなくなるのでスキップする
      if (_.size(get().feed) < 10) return;
      const newPost = [{ post: res.data.posts[0] }];
      const feed = _.concat(newPost, get().feed);
      set({ feed });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to post" }, e);
    }
  },
  uploadBlob: async (data: BlobRequest) => {
    try {
      const res = await agent.uploadBlob(data, { encoding: "image/png" });
      return res.data;
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to upload blob" }, e);
    }
  },
  deletePost: async (post: AppBskyFeedDefs.PostView) => {
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
  repost: async (post: AppBskyFeedDefs.PostView) => {
    try {
      return await agent.repost(post.uri, post.cid);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  deleteRepost: async (post: AppBskyFeedDefs.PostView) => {
    try {
      await agent.deleteRepost(post.viewer?.repost || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  like: async (post: AppBskyFeedDefs.PostView) => {
    try {
      return await agent.like(post.uri, post.cid);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
  deleteLike: async (post: AppBskyFeedDefs.PostView) => {
    try {
      await agent.deleteLike(post.viewer?.like || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
  updateFeedViewer: (post: AppBskyFeedDefs.PostView) => {
    const feed = _.map(get().feed, (f) => {
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
    set({ feed });
  },
});
