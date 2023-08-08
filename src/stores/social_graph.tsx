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
  getFollows: (actor: string) => Promise<void>;
  getFollowers: (actor: string) => Promise<void>;
  follow: (actor: string) => Promise<void>;
  unfollow: (following: string) => Promise<void>;
  mute: (actor: string) => Promise<void>;
  unmute: (actor: string) => Promise<void>;
  block: (actor: string) => Promise<void>;
  unblock: (blocking: string) => Promise<void>;
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
  getFollows: async (actor: string) => {
    try {
      const res = await agent.getFollows({ actor, cursor: get().followCursor, limit: 100 });
      if (!res.data.cursor) return;
      set({ follows: res.data.follows, followCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to get follows" }, e);
    }
  },
  getFollowers: async (actor: string) => {
    try {
      const res = await agent.getFollowers({ actor, cursor: get().followerCursor, limit: 100 });
      if (!res.data.cursor) return;
      set({ followers: res.data.followers, followerCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to get followers" }, e);
    }
  },
  follow: async (actor: string) => {
    try {
      await agent.follow(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to follow" }, e);
    }
  },
  unfollow: async (following: string) => {
    try {
      await agent.deleteFollow(following);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to unfollow" }, e);
    }
  },
  mute: async (actor: string) => {
    try {
      await agent.mute(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to mute account" }, e);
    }
  },
  unmute: async (actor: string) => {
    try {
      await agent.unmute(actor);
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed to mute account" }, e);
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
      get().createFailedMessage({ status: "error", title: "failed to block account" }, e);
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
      get().createFailedMessage({ status: "error", title: "failed to unblock account" }, e);
    }
  },
});
