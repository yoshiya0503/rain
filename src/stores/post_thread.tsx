import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyFeedDefs, AppBskyFeedPost, ComAtprotoRepoUploadBlob } from "@atproto/api";
import agent from "@/agent";

export interface PostThreadSlice {
  posts: AppBskyFeedDefs.PostView[];
  thread?: AppBskyFeedDefs.ThreadViewPost;
  getPosts: (uris: string[]) => Promise<unknown>;
  getPostThread: (uri: string) => Promise<unknown>;
  walkParents: (
    thread: AppBskyFeedDefs.ThreadViewPost,
    result?: AppBskyFeedDefs.PostView[]
  ) => AppBskyFeedDefs.PostView[];
  walkReplies: (
    thread: AppBskyFeedDefs.ThreadViewPost,
    result?: AppBskyFeedDefs.PostView[]
  ) => AppBskyFeedDefs.PostView[];
}

export const createPostThreadSlice: StateCreator<
  PostThreadSlice & MessageSlice & SessionSlice,
  [],
  [],
  PostThreadSlice
> = (set, get) => ({
  posts: [],
  thread: undefined,
  getPosts: async (uris: string[]) => {
    try {
      const res = await agent.getPosts({ uris });
      set({ posts: res.data.posts });
      return res.data.posts;
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch posts" }, e);
    }
  },
  getPostThread: async (uri: string) => {
    try {
      const res = await agent.getPostThread({ uri });
      if (AppBskyFeedDefs.isThreadViewPost(res.data.thread)) {
        set({ thread: res.data.thread });
      }
      return res.data.thread;
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch post thread" }, e);
    }
  },
  walkParents: (thread: AppBskyFeedDefs.ThreadViewPost, result = []) => {
    if (AppBskyFeedDefs.isThreadViewPost(thread.parent)) {
      return get().walkParents(thread.parent, _.concat([thread.post], result));
    } else {
      return _.concat([thread.post], result);
    }
  },
  walkReplies: (thread: AppBskyFeedDefs.ThreadViewPost, result = []) => {
    if (thread.replies && AppBskyFeedDefs.isThreadViewPost(thread.replies[0])) {
      return get().walkReplies(thread.replies[0], _.concat(result, [thread.post]));
    }
    return _.concat(result, [thread.post]);
  },
});
