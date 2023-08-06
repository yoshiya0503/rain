import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { FeedSlice } from "@/stores/feed";
import { AppBskyNotificationListNotifications, AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

export interface NotificationSlice {
  reducedNotifications: AppBskyNotificationListNotifications.Notification[][];
  notificationCursor: string;
  reasonSubjects: AppBskyFeedDefs.PostView[];
  listNotifications: () => Promise<void>;
  reduceNotifications: (
    notifications: AppBskyNotificationListNotifications.Notification[]
  ) => AppBskyNotificationListNotifications.Notification[][];
  reasonSubjectURIs: (notifications: AppBskyNotificationListNotifications.Notification[]) => string[];
}

export const createNotificationSlice: StateCreator<
  NotificationSlice & FeedSlice & MessageSlice,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  notificationCursor: "",
  reducedNotifications: [],
  reasonSubjects: [],
  listNotifications: async () => {
    try {
      const res = await agent.listNotifications({ cursor: get().notificationCursor, limit: 25 });
      if (!res.data.cursor) return;
      const reduced = get().reduceNotifications(res.data.notifications);
      const uris = get().reasonSubjectURIs(res.data.notifications);
      await get().getPosts(uris);
      const reasonSubjects = _.concat(get().reasonSubjects, get().posts);
      const reducedNotifications = _.concat(get().reducedNotifications, reduced);
      set({ reasonSubjects });
      set({ reducedNotifications, notificationCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", title: "failed fetch notifications" }, e);
    }
  },
  reduceNotifications: (notifications: AppBskyNotificationListNotifications.Notification[]) => {
    return _.chain(notifications)
      .groupBy((notification) => notification.reasonSubject || notification.reason)
      .toPairs()
      .orderBy((pair) => pair[1][0].indexedAt, "desc")
      .map((pair) => pair[1])
      .value();
  },
  reasonSubjectURIs: (notifications: AppBskyNotificationListNotifications.Notification[]) => {
    return _.chain(notifications)
      .uniqBy((notification) => notification.reasonSubject)
      .map((notification) => notification.reasonSubject)
      .compact()
      .value();
  },
});
