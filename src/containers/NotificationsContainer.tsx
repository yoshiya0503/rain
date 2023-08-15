import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Notification from "@/components/Notification";
import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

export const NotificationContainer = () => {
  const reducedNotifications = useStore((state) => state.reducedNotifications);
  const reasonSubjects = useStore((state) => state.reasonSubjects);
  const reasonReplies = useStore((state) => state.reasonReplies);
  const updateSeen = useStore((state) => state.updateSeen);
  const listNotifications = useStore((state) => state.listNotifications);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isEmpty(reducedNotifications)) {
    throw listNotifications();
  } else {
    updateSeen();
  }

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  const onOpenPost = useCallback(
    (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => {
      setPost(post);
      setType(type);
      openPostDialog();
    },
    [openPostDialog, setPost, setType]
  );

  const title = type === "reply" ? "Reply" : "Quote";

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <TransitionGroup>
        {_.map(reducedNotifications, (item) => {
          const reason = item[0].reason as "repost" | "like" | "follow" | "reply" | "quote" | "mention";
          const otherAuthors = _.chain(item).map("author").slice(1).value();
          const reasonSubject = _.find(reasonSubjects, (subject) => subject.uri === item[0].reasonSubject);
          const reasonReply = _.find(reasonReplies, (reply) => reply.uri === item[0].uri);
          return (
            <Collapse key={item[0].cid}>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Notification
                  notification={item[0]}
                  reason={reason}
                  otherAuthors={otherAuthors}
                  reasonSubject={reasonSubject}
                  reasonReply={reasonReply}
                  onOpenPost={onOpenPost}
                />
                <Divider />
              </Box>
            </Collapse>
          );
        })}
      </TransitionGroup>
      <LinearProgress />
      <PostDialog title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default NotificationContainer;
