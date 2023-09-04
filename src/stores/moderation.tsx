import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { ActorSlice } from "@/stores/actor";
import agent from "@/agent";

export interface ModerationSlice {
  report: (reason: string, reasonType: string, did: string) => Promise<void>;
}

export const createModerationSlice: StateCreator<
  ModerationSlice & MessageSlice & ActorSlice,
  [],
  [],
  ModerationSlice
> = (set, get) => ({
  report: async (reason: string, reasonType: string, did: string) => {
    try {
      await agent.api.com.atproto.moderation.createReport({
        reason,
        reasonType,
        subject: {
          name: "report",
          $type: "com.atproto.admin.defs#repoRef",
          did,
        },
      });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to resolve handle" }, e);
    }
  },
});
