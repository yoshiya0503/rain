import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyNotificationListNotifications } from "@atproto/api";
import agent from "@/agent";

export interface NotificationSlice {
  notifications: AppBskyNotificationListNotifications.Notification[];
  notificationCursor: string;
  listNotifications: () => Promise<void>;
}

export const createNotificationSlice: StateCreator<NotificationSlice & MessageSlice, [], [], NotificationSlice> = (
  set,
  get
) => ({
  notificationCursor: "",
  notifications: [],
  listNotifications: async () => {
    try {
      const res = await agent.listNotifications();
      set({ notifications: res.data.notifications, notificationCursor: res.data.cursor });
    } catch (e) {
      console.log(e);
      get().createFailedMessage({ status: "error", title: "failed fetch notifications" }, e);
    }
  },
});
