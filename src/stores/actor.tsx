import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyActorDefs } from "@atproto/api";
import agent from "@/agent";

export interface TimeLine {
  _id?: string;
}

export interface Post {
  _id?: string;
}

export interface ActorSlice {
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  getProfile: (actor: string) => Promise<void>;
}

export const createActorSlice: StateCreator<ActorSlice & MessageSlice, [], [], ActorSlice> = (set, get) => ({
  actor: undefined,
  getProfile: async (actor: string) => {
    try {
      const res = await agent.getProfile({ actor });
      console.log(res.data);
      set({ actor: res.data });
      get().createMessage({ status: "success", title: "success to fetch profile" });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch profile" }, e);
    }
  },
});
