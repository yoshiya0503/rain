import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyActorProfile } from "@atproto/api";
import agent from "@/agent";

export interface PreferenceSlice {
  preferences: AppBskyActorDefs.Preferences;
  getPreferences: () => Promise<void>;
  updatePreferences: (preferences: AppBskyActorDefs.Preferences) => Promise<void>;
}

export const createPreferenceSlice: StateCreator<
  PreferenceSlice & MessageSlice & SessionSlice,
  [],
  [],
  PreferenceSlice
> = (set, get) => ({
  preferences: [],
  getPreferences: async () => {
    try {
      const res = await agent.api.app.bsky.actor.getPreferences();
      set({ preferences: res.data.preferences });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch timeline" }, e);
    }
  },
  updatePreferences: async (preferences: AppBskyActorDefs.Preferences) => {
    try {
      await agent.api.app.bsky.actor.putPreferences({ preferences });
      set({ preferences: preferences });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch timeline" }, e);
    }
  },
});
