import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import agent from "@/agent";

export interface IdentitySlice {
  resolveHandle: (handle: string) => Promise<unknown>;
}

export const createIdentitySlice: StateCreator<IdentitySlice & MessageSlice & SessionSlice, [], [], IdentitySlice> = (
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
});
