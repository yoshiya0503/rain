import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Notification from "@/components/Notification";
import { AppBskyFeedDefs, AppBskyNotificationListNotifications } from "@atproto/api";

export const NotificationContainer = () => {
  const notifications = useStore((state) => state.notifications);
  const listNotifications = useStore((state) => state.listNotifications);

  if (_.isEmpty(notifications)) {
    throw listNotifications();
  }

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <TransitionGroup>
          {_.map(notifications, (item, key) => {
            // reasonSubjectのidを用いて、対象のpostListを取得する
            // notificationsはまとめられてこないので、こちらでまとめる必要がある
            // updateSeenで既読にする
            const reason = item.reason as "repost" | "like" | "follow" | "reply" | "quote";
            return (
              <Collapse key={item.cid}>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Notification notification={item} reason={reason} />
                  <Divider />
                </Box>
              </Collapse>
            );
          })}
        </TransitionGroup>
        <LinearProgress />
      </Box>
    </ScrollLayout>
  );
};

export default NotificationContainer;
