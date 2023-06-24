import { create } from "zustand";
import { FeedSlice, createFeedSlice } from "@/stores/feed";
import { SessionSlice, createSessionSlice } from "@/stores/session";
import { MessageSlice, createMessageSlice } from "@/stores/message";
import { ActorSlice, createActorSlice } from "@/stores/actor";

type StoreSlice = ActorSlice & FeedSlice & SessionSlice & MessageSlice;

export const useStore = create<StoreSlice>()((...a) => ({
  ...createActorSlice(...a),
  ...createFeedSlice(...a),
  ...createSessionSlice(...a),
  ...createMessageSlice(...a),
}));
