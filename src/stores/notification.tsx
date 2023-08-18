import _ from "lodash";
import { StateCreator } from "zustand";
import { MessageSlice } from "@/stores/message";
import { AppBskyNotificationListNotifications, AppBskyFeedDefs } from "@atproto/api";
import agent from "@/agent";

export interface NotificationSlice {
  reducedNotifications: AppBskyNotificationListNotifications.Notification[][];
  notificationCursor: string;
  unreadCount: number | null;
  reasonSubjects: AppBskyFeedDefs.PostView[];
  reasonReplies: AppBskyFeedDefs.PostView[];
  listNotifications: () => Promise<void>;
  reduceNotifications: (
    notifications: AppBskyNotificationListNotifications.Notification[]
  ) => AppBskyNotificationListNotifications.Notification[][];
  fetchReasonSubjects: (notifications: AppBskyNotificationListNotifications.Notification[]) => Promise<void>;
  fetchReasonReplies: (notifications: AppBskyNotificationListNotifications.Notification[]) => Promise<void>;
  countUnreadNotifications: () => Promise<void>;
  updateSeen: () => Promise<void>;
  updateNotificationViewer: (post: AppBskyFeedDefs.PostView) => void;
}

export const createNotificationSlice: StateCreator<NotificationSlice & MessageSlice, [], [], NotificationSlice> = (
  set,
  get
) => ({
  notificationCursor: "",
  reducedNotifications: [],
  unreadCount: null,
  reasonSubjects: [],
  reasonReplies: [],
  listNotifications: async () => {
    try {
      const res = await agent.listNotifications({ cursor: get().notificationCursor, limit: 25 });
      if (!res.data.cursor) return;
      await get().fetchReasonSubjects(res.data.notifications);
      await get().fetchReasonReplies(res.data.notifications);
      const reduced = get().reduceNotifications(res.data.notifications);
      const reducedNotifications = _.concat(get().reducedNotifications, reduced);
      set({ reducedNotifications, notificationCursor: res.data.cursor });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch notifications" }, e);
    }
  },
  reduceNotifications: (notifications: AppBskyNotificationListNotifications.Notification[]) => {
    return _.chain(notifications)
      .groupBy((notification) => `${notification.reason}/${notification.reasonSubject}`)
      .toPairs()
      .orderBy((pair) => pair[1][0].indexedAt, "desc")
      .map((pair) => pair[1])
      .value();
  },
  fetchReasonSubjects: async (notifications: AppBskyNotificationListNotifications.Notification[]) => {
    try {
      // 通知のもとになった自分の投稿
      const uris = _.chain(notifications)
        .uniqBy((notification) => notification.reasonSubject)
        .map((notification) => notification.reasonSubject)
        .compact()
        .value();
      if (_.isEmpty(uris)) return;
      const res = await agent.getPosts({ uris });
      const reasonSubjects = _.concat(get().reasonSubjects, res.data.posts);
      set({ reasonSubjects });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch reason subjects" }, e);
    }
  },
  fetchReasonReplies: async (notifications: AppBskyNotificationListNotifications.Notification[]) => {
    try {
      // 通知に載せられた他人の投稿, mention, reply, quote
      const uris = _.chain(notifications)
        .filter(
          (notification) =>
            notification.reason === "reply" || notification.reason === "mention" || notification.reason === "quote"
        )
        .map((notification) => notification.uri)
        .uniq()
        .compact()
        .value();
      if (_.isEmpty(uris)) return;
      const res = await agent.getPosts({ uris });
      const reasonReplies = _.concat(get().reasonReplies, res.data.posts);
      set({ reasonReplies });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch reason replies" }, e);
    }
  },
  countUnreadNotifications: async () => {
    try {
      const res = await agent.countUnreadNotifications({});
      set({ unreadCount: res.data.count });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed fetch count unread notifications" }, e);
    }
  },
  updateSeen: async () => {
    try {
      await agent.updateSeenNotifications();
      set({ unreadCount: 0 });
    } catch (e) {
      get().createFailedMessage({ status: "error", description: "failed update seen notification" }, e);
    }
  },
  updateNotificationViewer: (post: AppBskyFeedDefs.PostView) => {
    const reasonReplies = _.map(get().reasonReplies, (subject) => (subject.uri === post.uri ? post : subject));
    set({ reasonReplies });
  },
});
