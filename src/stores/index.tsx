import { create } from "zustand";
import { TimelineSlice, createTimelineSlice } from "@/stores/timeline";
import { PostThreadSlice, createPostThreadSlice } from "@/stores/post_thread";
import { SessionSlice, createSessionSlice } from "@/stores/session";
import { MessageSlice, createMessageSlice } from "@/stores/message";
import { ActorSlice, createActorSlice } from "@/stores/actor";
import { NotificationSlice, createNotificationSlice } from "@/stores/notification";
import { SocialGraphSlice, createSocialGraphSlice } from "@/stores/social_graph";
import { IdentitySlice, createIdentitySlice } from "@/stores/identity";
import { FeedGeneratorSlice, createFeedGeneratorSlice } from "@/stores/feed_generator";
import { LayoutSlice, createLayoutSlice } from "@/stores/layout";

type StoreSlice = ActorSlice &
  SessionSlice &
  TimelineSlice &
  NotificationSlice &
  SocialGraphSlice &
  PostThreadSlice &
  IdentitySlice &
  FeedGeneratorSlice &
  MessageSlice &
  LayoutSlice;

export const useStore = create<StoreSlice>()((...a) => ({
  ...createActorSlice(...a),
  ...createTimelineSlice(...a),
  ...createPostThreadSlice(...a),
  ...createSessionSlice(...a),
  ...createMessageSlice(...a),
  ...createNotificationSlice(...a),
  ...createSocialGraphSlice(...a),
  ...createIdentitySlice(...a),
  ...createFeedGeneratorSlice(...a),
  ...createLayoutSlice(...a),
}));
