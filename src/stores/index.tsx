import { create } from "zustand";
import { FeedSlice, createFeedSlice } from "@/stores/feed";
import { SessionSlice, createSessionSlice } from "@/stores/session";
import { MessageSlice, createMessageSlice } from "@/stores/message";
import { ActorSlice, createActorSlice } from "@/stores/actor";
import { NotificationSlice, createNotificationSlice } from "@/stores/notification";
import { SocialGraphSlice, createSocialGraphSlice } from "@/stores/social_graph";

type StoreSlice = ActorSlice & FeedSlice & SessionSlice & MessageSlice & NotificationSlice & SocialGraphSlice;

export const useStore = create<StoreSlice>()((...a) => ({
  ...createActorSlice(...a),
  ...createFeedSlice(...a),
  ...createSessionSlice(...a),
  ...createMessageSlice(...a),
  ...createNotificationSlice(...a),
  ...createSocialGraphSlice(...a),
}));
