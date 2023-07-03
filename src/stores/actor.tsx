import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { SessionSlice } from "@/stores/session";
import { AppBskyActorDefs } from "@atproto/api";
import agent from "@/agent";

export interface ActorSlice {
  me?: AppBskyActorDefs.ProfileViewDetailed;
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  getMe: () => Promise<void>;
  getProfile: (actor: string) => Promise<void>;
}

export const createActorSlice: StateCreator<ActorSlice & MessageSlice & SessionSlice, [], [], ActorSlice> = (
  set,
  get
) => ({
  actor: undefined,
  me: undefined,
  getMe: async () => {
    try {
      const session = get().session;
      const res = await agent.getProfile({ actor: session.did });
      set({ me: res.data });
      get().createMessage({ status: "success", title: "success to fetch profile" });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch profile" }, e);
    }
  },
  getProfile: async (actor: string) => {
    try {
      const res = await agent.getProfile({ actor });
      set({ actor: res.data });
      get().createMessage({ status: "success", title: "success to fetch profile" });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch profile" }, e);
    }
  },
});
