import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { ActorSlice } from "@/stores/actor";
import agent from "@/agent";

export interface ModerationSlice {
  reportActor: (reason: string, reasonType: string, did: string) => Promise<void>;
  reportPost: (reason: string, reasonType: string, cid: string, uri: string) => Promise<void>;
}

export const createModerationSlice: StateCreator<
  ModerationSlice & MessageSlice & ActorSlice,
  [],
  [],
  ModerationSlice
> = (_, get) => ({
  reportActor: async (reason: string, reasonType: string, did: string) => {
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
      get().createFailedMessage({ status: "error", description: "failed to repost user" }, e);
    }
  },
  reportPost: async (reason: string, reasonType: string, cid: string, uri: string) => {
    try {
      await agent.api.com.atproto.moderation.createReport({
        reason,
        reasonType,
        subject: {
          name: "report",
          $type: "com.atproto.repo.strongRef",
          uri,
          cid,
        },
      });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to repost post" }, e);
    }
  },
});
