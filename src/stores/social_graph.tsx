import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AtUri } from "@atproto/uri";
import { AppBskyActorDefs } from "@atproto/api";
import agent from "@/agent";

export interface SocialGraphSlice {
  follows: AppBskyActorDefs.ProfileView[];
  followers: AppBskyActorDefs.ProfileView[];
  followCursor: string;
  followerCursor: string;
  followSubject?: AppBskyActorDefs.ProfileView;
  getFollows: (actor: string, isReset: boolean) => Promise<void>;
  getFollowers: (actor: string, isReset: boolean) => Promise<void>;
  follow: (actor: string) => Promise<void>;
  unfollow: (following: string) => Promise<void>;
  mute: (actor: string) => Promise<void>;
  unmute: (actor: string) => Promise<void>;
  block: (actor: string) => Promise<void>;
  unblock: (blocking: string) => Promise<void>;
  updateFollowViwer: (actor: AppBskyActorDefs.ProfileView, type: "follows" | "followers") => void;
}

export const createSocialGraphSlice: StateCreator<
  SocialGraphSlice & MessageSlice & SessionSlice,
  [],
  [],
  SocialGraphSlice
> = (set, get) => ({
  follows: [],
  followers: [],
  followCursor: "",
  followerCursor: "",
  followSubject: undefined,
  getFollows: async (actor: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().followCursor;
      const res = await agent.getFollows({ actor, cursor, limit: 100 });
      if (!res.data.cursor) return;
      if (isReset) {
        set({ follows: res.data.follows, followSubject: res.data.subject, followCursor: res.data.cursor });
      } else {
        const follows = _.concat(get().follows, res.data.follows);
        set({ follows, followSubject: res.data.subject, followerCursor: res.data.cursor });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to get follows" }, e);
    }
  },
  getFollowers: async (actor: string, isReset: boolean) => {
    try {
      const cursor = isReset ? "" : get().followCursor;
      const res = await agent.getFollowers({ actor, cursor, limit: 100 });
      if (!res.data.cursor) return;
      if (isReset) {
        set({ followers: res.data.followers, followSubject: res.data.subject, followerCursor: res.data.cursor });
      } else {
        const followers = _.concat(get().followers, res.data.followers);
        set({ followers, followSubject: res.data.subject, followerCursor: res.data.cursor });
      }
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to get followers" }, e);
    }
  },
  follow: async (actor: string) => {
    try {
      await agent.follow(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to follow" }, e);
    }
  },
  unfollow: async (following: string) => {
    try {
      await agent.deleteFollow(following);
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to unfollow" }, e);
    }
  },
  mute: async (actor: string) => {
    try {
      await agent.mute(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to mute account" }, e);
    }
  },
  unmute: async (actor: string) => {
    try {
      await agent.unmute(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to mute account" }, e);
    }
  },
  block: async (actor: string) => {
    try {
      const did = get().session?.did;
      agent.api.app.bsky.graph.block.create(
        { repo: did },
        {
          subject: actor,
          createdAt: new Date().toISOString(),
        }
      );
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to block account" }, e);
    }
  },
  unblock: async (blocking: string) => {
    try {
      const blockingUrip = new AtUri(blocking);
      agent.api.app.bsky.graph.block.delete({
        repo: blockingUrip.hostname,
        rkey: blockingUrip.rkey,
      });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to unblock account" }, e);
    }
  },
  updateFollowViwer: (actor: AppBskyActorDefs.ProfileView, type: "follows" | "followers") => {
    const update = _.map(get()[type], (f) => {
      if (f.did === actor.did) {
        if (_.has(f.viewer, type)) {
          f.viewer = _.omit(f.viewer, "following");
        } else {
          f.viewer = { ...f.viewer, following: actor.did };
        }
      }
      return f;
    });
    set({ [type]: update });
  },
});
