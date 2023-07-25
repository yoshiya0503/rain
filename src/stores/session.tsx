import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AtpSessionData } from "@atproto/api";
import agent from "@/agent";

export interface SessionSlice {
  session: AtpSessionData;
  createAccount: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const createSessionSlice: StateCreator<SessionSlice & MessageSlice, [], [], SessionSlice> = (set, get) => ({
  session: {
    refreshJwt: localStorage.getItem("X-SKYLINE-REFRESHJWT") || "",
    accessJwt: localStorage.getItem("X-SKYLINE-ACCESSJWT") || "",
    did: localStorage.getItem("X-SKYLINE-DID") || "",
    email: localStorage.getItem("X-SKYLINE-EMAIL") || "",
    handle: localStorage.getItem("X-SKYLINE-HANDLE") || "",
  },
  createAccount: async () => {
    return;
  },
  login: async (identifier: string, password: string) => {
    try {
      const res = await agent.login({ identifier, password });
      localStorage.setItem("X-SKYLINE-REFRESHJWT", res.data.refreshJwt);
      localStorage.setItem("X-SKYLINE-ACCESSJWT", res.data.accessJwt);
      localStorage.setItem("X-SKYLINE-DID", res.data.did);
      localStorage.setItem("X-SKYLINE-EMAIL", res.data.email || "");
      localStorage.setItem("X-SKYLINE-HANDLE", res.data.handle);
      set({ session: res.data });
    } catch (e) {
      get().createMessage({ status: "error", title: "invalid identifier" });
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem("X-SKYLINE-REFRESHJWT");
      localStorage.removeItem("X-SKYLINE-ACCESSJWT");
      localStorage.removeItem("X-SKYLINE-DID");
      localStorage.removeItem("X-SKYLINE-EMAIL");
      localStorage.removeItem("X-SKYLINE-HANDLE");
      const session = {
        refreshJwt: "",
        accessJwt: "",
        did: "",
        email: "",
        handle: "",
      };
      set({ session });
    } catch (e) {
      get().createMessage({ status: "error", title: "logout error" });
    }
  },
});
