import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { IdentitySlice } from "@/stores/identity";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyFeedGetLikes } from "@atproto/api";
import agent from "@/agent";

export interface PostThreadSlice {
  posts: AppBskyFeedDefs.PostView[];
  thread?: AppBskyFeedDefs.ThreadViewPost;
  threadParent?: AppBskyFeedDefs.PostView[];
  threadReplies?: AppBskyFeedDefs.PostView[][];
  repostedBy: AppBskyActorDefs.ProfileView[];
  likedBy: AppBskyFeedGetLikes.Like[];
  threadSubject?: string;
  repostedByCursor: string;
  likedByCursor: string;
  uri: string;
  seenRepostedURI: string;
  seenLikedURI: string;
  getPosts: (uris: string[]) => Promise<unknown>;
  getPostThread: (uri: string) => Promise<unknown>;
  getRepostedBy: (uri: string, isReset: boolean) => Promise<unknown>;
  getLikedBy: (uri: string, isReset: boolean) => Promise<unknown>;
  walkParents: (
    thread: AppBskyFeedDefs.ThreadViewPost,
    result?: AppBskyFeedDefs.PostView[]
  ) => AppBskyFeedDefs.PostView[];
  walkReplies: (
    thread: AppBskyFeedDefs.ThreadViewPost,
    result?: AppBskyFeedDefs.PostView[]
  ) => AppBskyFeedDefs.PostView[];
  updatePostThreadViewer: (post: AppBskyFeedDefs.PostView) => void;
}

export const createPostThreadSlice: StateCreator<
  PostThreadSlice & MessageSlice & IdentitySlice,
  [],
  [],
  PostThreadSlice
> = (set, get) => ({
  posts: [],
  likedBy: [],
  repostedBy: [],
  repostedByCursor: "",
  likedByCursor: "",
  uri: "",
  seenRepostedURI: "",
  seenLikedURI: "",
  subject: undefined,
  thread: undefined,
  threadParent: undefined,
  threadReplies: undefined,
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
    const id = _.last(_.split(uri, "/"));
    try {
      const res = await agent.getPostThread({ uri });
      if (AppBskyFeedDefs.isThreadViewPost(res.data.thread)) {
        const threadParent =
          (AppBskyFeedDefs.isThreadViewPost(res.data.thread.parent) && get().walkParents(res.data.thread.parent)) ||
          undefined;
        const threadReplies = _.chain(res.data.thread.replies)
          .map((reply) => {
            if (AppBskyFeedDefs.isThreadViewPost(reply)) {
              return get().walkReplies(reply);
            }
          })
          .compact()
          .value();
        set({ thread: res.data.thread, threadSubject: id, threadReplies, threadParent });
      }
      return res.data.thread;
    } catch (e) {
      set({ threadSubject: id });
      get().createFailedMessage({ status: "error", title: "failed to fetch post thread" }, e);
    }
  },
  getRepostedBy: async (uri: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().repostedByCursor;
      const seenRepostedURI = `${uri}/reposted`;
      const res = await agent.getRepostedBy({ uri, cursor });
      if (isReset) {
        set({ repostedByCursor: res.data.cursor, repostedBy: res.data.repostedBy, uri, seenRepostedURI });
      } else {
        const repostedBy = _.concat(get().repostedBy, res.data.repostedBy);
        set({ repostedByCursor: res.data.cursor, repostedBy, uri, seenRepostedURI });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch reposted actors" }, e);
    }
  },
  getLikedBy: async (uri: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().likedByCursor;
      const seenLikedURI = `${uri}/liked`;
      const res = await agent.getLikes({ uri, cursor });
      if (isReset) {
        set({ likedByCursor: res.data.cursor, likedBy: res.data.likes, uri, seenLikedURI });
      } else {
        const likedBy = _.concat(get().likedBy, res.data.likes);
        set({ likedByCursor: res.data.cursor, likedBy, uri, seenLikedURI });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to fetch liked actors" }, e);
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
  updatePostThreadViewer: (post: AppBskyFeedDefs.PostView) => {
    const threadReplies = _.map(get().threadReplies, (r) => {
      return _.map(r, (t) => (t.uri === post.uri ? post : t));
    });
    const threadParent = _.map(get().threadParent, (t) => (t.uri === post.uri ? post : t));
    const thread = get().thread;
    if (AppBskyFeedDefs.isThreadViewPost(thread) && post.uri === thread?.post.uri) {
      thread.post = post;
    }
    set({ thread, threadReplies, threadParent });
    return;
  },
});
