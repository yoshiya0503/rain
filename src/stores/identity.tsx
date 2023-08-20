import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { ActorSlice } from "@/stores/actor";
import agent from "@/agent";

export interface IdentitySlice {
  resolveHandle: (handle: string) => Promise<unknown>;
  updateHandle: (handle: string) => Promise<void>;
}

export const createIdentitySlice: StateCreator<IdentitySlice & MessageSlice & ActorSlice, [], [], IdentitySlice> = (
  set,
  get
) => ({
  resolveHandle: async (handle: string) => {
    try {
      const res = await agent.resolveHandle({ handle });
      return res.data.did;
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed to resolve handle" }, e);
    }
  },
  updateHandle: async (handle: string) => {
    try {
      await agent.updateHandle({ handle });
      await get().getMe();
      await get().getProfile(get().me?.handle || "");
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed update handle" }, e);
    }
  },
});
