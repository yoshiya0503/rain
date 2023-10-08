import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyFeedDefs, AppBskyActorDefs } from "@atproto/api";
import agent from "@/agent";

export interface PreferenceSlice {
  preferences: AppBskyActorDefs.Preferences;
  inviteCodes?: { used: boolean; code: string }[] | null;
  appPasswords?: { name: string; createdAt: string }[];
  createdHash: string;
  savedFeeds: AppBskyFeedDefs.GeneratorView[];
  getPreferences: () => Promise<void>;
  updatePreferences: (preferences: AppBskyActorDefs.Preferences) => Promise<void>;
  getInviteCodes: () => Promise<void>;
  listAppPasswords: () => Promise<void>;
  createAppPassword: (name: string) => Promise<string | void>;
  deleteAppPassword: (name: string) => Promise<void>;
}

export const createPreferenceSlice: StateCreator<
  PreferenceSlice & MessageSlice & SessionSlice,
  [],
  [],
  PreferenceSlice
> = (set, get) => ({
  preferences: [],
  inviteCodes: undefined,
  appPasswords: undefined,
  savedFeeds: [],
  createdHash: "",
  getPreferences: async () => {
    try {
      const res = await agent.api.app.bsky.actor.getPreferences();
      const feedPref = _.find(res.data.preferences, (p) => AppBskyActorDefs.isSavedFeedsPref(p));
      const saved = (AppBskyActorDefs.isSavedFeedsPref(feedPref) && feedPref?.saved) || [];
      const feedResponse = await agent.api.app.bsky.feed.getFeedGenerators({ feeds: saved });
      set({ preferences: res.data.preferences, savedFeeds: feedResponse.data.feeds });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch timeline" }, e);
    }
  },
  updatePreferences: async (preferences: AppBskyActorDefs.Preferences) => {
    try {
      await agent.api.app.bsky.actor.putPreferences({ preferences });
      set({ preferences });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch timeline" }, e);
    }
  },
  getInviteCodes: async () => {
    try {
      const res = await agent.api.com.atproto.server.getAccountInviteCodes();
      const inviteCodes = _.chain(res.data.codes)
        .map((code) => ({ used: !_.isEmpty(code.uses), code: code.code }))
        .sortBy("used")
        .value();
      set({ inviteCodes });
    } catch (e) {
      set({ inviteCodes: null });
    }
  },
  listAppPasswords: async () => {
    try {
      const res = await agent.api.com.atproto.server.listAppPasswords();
      const appPasswords = _.map(res.data.passwords, (item) => ({ name: item.name, createdAt: item.createdAt }));
      set({ appPasswords });
    } catch (e) {
      set({ appPasswords: [] });
      get().createFailedMessage({ status: "error", description: "failed fetch app passwords" }, e);
    }
  },
  createAppPassword: async (name: string) => {
    try {
      const res = await agent.api.com.atproto.server.createAppPassword({ name });
      await get().listAppPasswords();
      return res.data.password;
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to create app passwords" }, e);
    }
  },
  deleteAppPassword: async (name: string) => {
    try {
      await agent.api.com.atproto.server.revokeAppPassword({ name });
      await get().listAppPasswords();
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to revoke app passwords" }, e);
    }
  },
});
