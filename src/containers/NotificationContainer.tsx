import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Notification from "@/components/Notification";

export const NotificationContainer = () => {
  const reducedNotifications = useStore((state) => state.reducedNotifications);
  const reasonSubjects = useStore((state) => state.reasonSubjects);
  const listNotifications = useStore((state) => state.listNotifications);

  if (_.isEmpty(reducedNotifications)) {
    throw listNotifications();
  }

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <TransitionGroup>
          {_.map(reducedNotifications, (item) => {
            // TODO updateSeenで既読にする
            // TODO replyとlike,repostが同じsubjectで同時に起きることがある
            // like, repost dislike のupdateが必要
            const reason = item[0].reason as "repost" | "like" | "follow" | "reply" | "quote";
            const otherAuthors = _.chain(item).map("author").slice(1).value();
            const reasonSubject = _.find(reasonSubjects, (subject) => subject.uri === item[0].reasonSubject);
            return (
              <Collapse key={item[0].cid}>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Notification
                    notification={item[0]}
                    reason={reason}
                    otherAuthors={otherAuthors}
                    reasonSubject={reasonSubject}
                  />
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
