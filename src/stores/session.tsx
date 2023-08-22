import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AtpSessionData } from "@atproto/api";
import agent from "@/agent";

export interface SessionSlice {
  session?: AtpSessionData | null;
  createAccount: () => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resume: () => Promise<void>;
}

export const createSessionSlice: StateCreator<SessionSlice & MessageSlice, [], [], SessionSlice> = (set, get) => ({
  session: undefined,
  createAccount: async () => {
    return;
  },
  login: async (identifier: string, password: string) => {
    try {
      const res = await agent.login({ identifier, password });
      localStorage.setItem("X-RAIN-REFRESHJWT", res.data.refreshJwt);
      localStorage.setItem("X-RAIN-ACCESSJWT", res.data.accessJwt);
      localStorage.setItem("X-RAIN-DID", res.data.did);
      localStorage.setItem("X-RAIN-EMAIL", res.data.email || "");
      localStorage.setItem("X-RAIN-HANDLE", res.data.handle);
      set({ session: res.data });
    } catch (e) {
      get().createMessage({ status: "error", description: "invalid identifier" });
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem("X-RAIN-REFRESHJWT");
      localStorage.removeItem("X-RAIN-ACCESSJWT");
      localStorage.removeItem("X-RAIN-DID");
      localStorage.removeItem("X-RAIN-EMAIL");
      localStorage.removeItem("X-RAIN-HANDLE");
      set({ session: undefined });
    } catch (e) {
      get().createMessage({ status: "error", description: "logout error" });
    }
  },
  resume: async () => {
    try {
      const res = await agent.resumeSession({
        refreshJwt: localStorage.getItem("X-RAIN-REFRESHJWT") || "",
        accessJwt: localStorage.getItem("X-RAIN-ACCESSJWT") || "",
        did: localStorage.getItem("X-RAIN-DID") || "",
        email: localStorage.getItem("X-RAIN-EMAIL") || "",
        handle: localStorage.getItem("X-RAIN-HANDLE") || "",
      });
      const session = {
        refreshJwt: localStorage.getItem("X-RAIN-REFRESHJWT") || "",
        accessJwt: localStorage.getItem("X-RAIN-ACCESSJWT") || "",
        did: res.data.did,
        handle: res.data.handle,
        email: res.data.email,
      };
      set({ session });
    } catch (e) {
      get().createMessage({ status: "error", description: "token expired" });
      set({ session: null });
    }
  },
});
