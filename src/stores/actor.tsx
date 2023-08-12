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
  getMe: () => Promise<void>;
  getProfile: (actor: string) => Promise<void>;
  getAuthorFeed: (actor: string, isReset: boolean) => Promise<void>;
  updateProfile: (record: AppBskyActorProfile.Record) => Promise<void>;
  updateHandle: (handle: string) => Promise<void>;
  updateAuthorFeedViewer: (post: AppBskyFeedDefs.PostView, action: "like" | "repost", resourceURI?: string) => void;
}

export const createActorSlice: StateCreator<ActorSlice & MessageSlice & SessionSlice, [], [], ActorSlice> = (
  set,
  get
) => ({
  actor: undefined,
  me: undefined,
  authorCursor: "",
  authorFeed: [],
  getMe: async () => {
    try {
      const session = get().session;
      const res = await agent.getProfile({ actor: session?.did || "" });
      set({ me: res.data });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch profile" }, e);
    }
  },
  getProfile: async (actor: string) => {
    try {
      const res = await agent.getProfile({ actor });
      set({ actor: res.data });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch profile" }, e);
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
  updateProfile: async (record: AppBskyActorProfile.Record) => {
    try {
      await agent.upsertProfile(async (existing?: AppBskyActorProfile.Record) => {
        return { ...existing, ..._.omitBy(record, _.isEmpty) };
      });
      await get().getMe();
      await get().getProfile(get().me?.handle || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed update profile" }, e);
    }
  },
  updateHandle: async (handle: string) => {
    try {
      await agent.updateHandle({ handle });
      await get().getMe();
      await get().getProfile(get().me?.handle || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed update handle" }, e);
    }
  },
  updateAuthorFeedViewer: (post: AppBskyFeedDefs.PostView, action: "like" | "repost", resourceURI?: string | null) => {
    const authorFeed = _.map(get().authorFeed, (f) => {
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
    set({ authorFeed });
  },
});
