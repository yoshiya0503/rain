import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyFeedDefs, AppBskyFeedPost, ComAtprotoRepoUploadBlob } from "@atproto/api";
import agent from "@/agent";

export type PostView = AppBskyFeedDefs.PostView;

export type Record = Partial<AppBskyFeedPost.Record> & Omit<AppBskyFeedPost.Record, "createdAt">;
export type BlobRequest = ComAtprotoRepoUploadBlob.InputSchema;
export type BlobResponse = ComAtprotoRepoUploadBlob.OutputSchema;

export interface FeedSlice {
  feed: AppBskyFeedDefs.FeedViewPost[];
  authorFeed: AppBskyFeedDefs.FeedViewPost[];
  cursor: string;
  authorCursor: string;
  getTimeline: () => Promise<void | boolean>;
  getInitialTimeline: () => Promise<void>;
  getAuthorFeed: (actor: string, isReset: boolean) => Promise<void>;
  post: (record: Record) => Promise<void>;
  getPosts: (uris: string[]) => Promise<unknown>;
  getPostThread: (uri: string) => Promise<unknown>;
  uploadBlob: (data: BlobRequest) => Promise<BlobResponse | undefined>;
  deletePost: (record: PostView) => Promise<void>;
  repost: (record: PostView) => Promise<void>;
  deleteRepost: (record: PostView) => Promise<void>;
  like: (record: PostView) => Promise<void>;
  deleteLike: (record: PostView) => Promise<void>;
  updateFeedViewer: (
    post: PostView,
    resourceURI: string | null,
    feed: "feed" | "authorFeed",
    action: "like" | "repost"
  ) => void;
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
      // TODO feedがbotで埋め尽くされたときにもう一回リロードしないとい
      const res = await agent.getTimeline({ cursor: get().cursor, limit: 100 });
      if (!res.data.cursor) return true;
      const filterList: string[] = [];
      const computedFeed = _.filter(res.data.feed, (f) => {
        // TODO isThreadViewPostとかの挙動をチェック
        if (f.post.author?.did === "did:plc:4hqjfn7m6n5hno3doamuhgef") return false;
        if (AppBskyFeedDefs.isReasonRepost(f.reason)) {
          const session = get().session;
          if (f.reason.by.did === session?.did) return false;
        }
        if (_.includes(filterList, f.post.cid)) {
          return false;
        }
        // TODO これ意味ある？
        if (AppBskyFeedDefs.isReplyRef(f.reply)) {
          if (AppBskyFeedDefs.isPostView(f.reply.root)) {
            filterList.push(f.reply.root.cid);
          }
          if (AppBskyFeedDefs.isPostView(f.reply.parent)) {
            filterList.push(f.reply.parent.cid);
          }
        }
        return true;
      });
      const feed = _.concat(get().feed, computedFeed);
      set({ feed, cursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  getInitialTimeline: async () => {
    let isLastOrder;
    while (_.size(get().feed) < 10 && !isLastOrder) {
      isLastOrder = await get().getTimeline();
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
      get().createFailedMessage({ status: "error", title: "failed fetch timeline" }, e);
    }
  },
  getPosts: async (uris: string[]) => {
    try {
      const res = await agent.getPosts({ uris });
      return res.data.posts;
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch posts" }, e);
    }
  },
  getPostThread: async (uri: string) => {
    try {
      const res = await agent.getPostThread({ uri });
      return res.data.thread;
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch post thread" }, e);
    }
  },
  post: async (record: Record) => {
    try {
      const postResponse = await agent.post(record);
      // TODO 新しく作られたpostにはthreads情報が入っていない
      const res = await agent.getPosts({ uris: [postResponse.uri] });
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
      get().updateFeedViewer(post, res.uri, "feed", "repost");
      get().updateFeedViewer(post, res.uri, "authorFeed", "repost");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  deleteRepost: async (post: PostView) => {
    try {
      await agent.deleteRepost(post.viewer?.repost || "");
      get().updateFeedViewer(post, null, "feed", "repost");
      get().updateFeedViewer(post, null, "authorFeed", "repost");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to repost" }, e);
    }
  },
  like: async (post: PostView) => {
    try {
      const res = await agent.like(post.uri, post.cid);
      get().updateFeedViewer(post, res.uri, "feed", "like");
      get().updateFeedViewer(post, res.uri, "authorFeed", "like");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
  deleteLike: async (post: PostView) => {
    try {
      await agent.deleteLike(post.viewer?.like || "");
      get().updateFeedViewer(post, null, "feed", "like");
      get().updateFeedViewer(post, null, "authorFeed", "like");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to like" }, e);
    }
  },
  updateFeedViewer: (
    post: PostView,
    resourceURI: string | null,
    feed: "feed" | "authorFeed",
    action: "like" | "repost"
  ) => {
    const targetFeed = feed === "feed" ? get().feed : get().authorFeed;
    const update = _.map(targetFeed, (f) => {
      if (AppBskyFeedDefs.isPostView(f.reply?.root)) {
        if (f.reply?.root.uri === post.uri) {
          if (_.has(f.reply?.root?.viewer, action)) {
            f.reply.root.viewer = _.omit(f.reply.root.viewer, action);
          } else {
            f.reply.root.viewer = { ...f.reply.root.viewer, [action]: resourceURI };
          }
        }
      }
      if (AppBskyFeedDefs.isPostView(f.reply?.parent)) {
        if (f.reply?.parent.uri === post.uri) {
          if (_.has(f.reply?.parent?.viewer, action)) {
            f.reply.parent.viewer = _.omit(f.reply.parent.viewer, action);
          } else {
            f.reply.parent.viewer = { ...f.reply.parent.viewer, [action]: resourceURI };
          }
        }
      }
      if (f.post.uri === post.uri) {
        if (_.has(f.post.viewer, action)) {
          f.post.viewer = _.omit(f.post.viewer, action);
        } else {
          f.post.viewer = { ...f.post.viewer, [action]: resourceURI };
        }
      }
      return f;
    });
    set({ [feed]: update });
  },
});
