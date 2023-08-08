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
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

export const NotificationContainer = () => {
  const reducedNotifications = useStore((state) => state.reducedNotifications);
  const reasonSubjects = useStore((state) => state.reasonSubjects);
  const reasonReplies = useStore((state) => state.reasonReplies);
  const listNotifications = useStore((state) => state.listNotifications);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [replyPost, setReplyPost] = useState<AppBskyFeedDefs.PostView>();
  const [replyRoot, setReplyRoot] = useState<{ cid: string; uri: string }>();

  if (_.isEmpty(reducedNotifications)) {
    throw listNotifications();
  }

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  const onReply = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      setReplyPost(post);
      if (AppBskyFeedPost.isRecord(post.record)) {
        setReplyRoot(post.record.reply?.root);
      }
      openPostDialog();
    },
    [openPostDialog, setReplyRoot]
  );

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <TransitionGroup>
          {_.map(reducedNotifications, (item) => {
            // TODO updateSeenで既読にする
            // TODO バッチつける
            // TODO replyとlike,repostが同じsubjectで同時に起きることがある
            const reason = item[0].reason as "repost" | "like" | "follow" | "reply" | "quote";
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
                    onReply={onReply}
                  />
                  <Divider />
                </Box>
              </Collapse>
            );
          })}
        </TransitionGroup>
        <LinearProgress />
      </Box>
      <PostDialog title="Reply" open={isOpen} post={replyPost} root={replyRoot} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default NotificationContainer;
