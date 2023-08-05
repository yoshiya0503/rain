import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { FeedSlice } from "@/stores/feed";
import { AppBskyNotificationListNotifications } from "@atproto/api";
import agent from "@/agent";

export interface NotificationSlice {
  notifications: AppBskyNotificationListNotifications.Notification[];
  reducedNotifications: AppBskyNotificationListNotifications.Notification[][];
  notificationCursor: string;
  listNotifications: () => Promise<void>;
  reduceNotifications: (
    notifications: AppBskyNotificationListNotifications.Notification[]
  ) => AppBskyNotificationListNotifications.Notification[][];
}

export const createNotificationSlice: StateCreator<
  NotificationSlice & FeedSlice & MessageSlice,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  notificationCursor: "",
  notifications: [],
  reducedNotifications: [],
  listNotifications: async () => {
    try {
      const res = await agent.listNotifications({ cursor: get().notificationCursor });
      if (!res.data.cursor) return;
      const notifications = _.concat(get().notifications, res.data.notifications);
      const reducedNotifications = get().reduceNotifications(notifications);
      set({ reducedNotifications });
      set({ notifications, notificationCursor: res.data.cursor });
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
});
