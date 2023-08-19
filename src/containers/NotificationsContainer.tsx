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
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

export const NotificationContainer = () => {
  const reducedNotifications = useStore((state) => state.reducedNotifications);
  const reasonSubjects = useStore((state) => state.reasonSubjects);
  const reasonReplies = useStore((state) => state.reasonReplies);
  const updateSeen = useStore((state) => state.updateSeen);
  const listNotifications = useStore((state) => state.listNotifications);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
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

  const onOpenImage = useCallback(
    (images: AppBskyEmbedImages.ViewImage[]) => {
      setImages(images);
      openImageDialog();
    },
    [openImageDialog, setImages]
  );

  const title = type === "reply" ? "Reply" : "Quote";

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <TransitionGroup>
        {_.map(reducedNotifications, (item) => {
          const otherAuthors = _.chain(item).map("author").slice(1).value();
          const reasonSubject = _.find(reasonSubjects, (subject) => subject.uri === item[0].reasonSubject);
          const reasonReply = _.find(reasonReplies, (reply) => reply.uri === item[0].uri);
          return (
            <Collapse key={item[0].cid}>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Notification
                  notification={item[0]}
                  otherAuthors={otherAuthors}
                  reasonSubject={reasonSubject}
                  reasonReply={reasonReply}
                  onOpenPost={onOpenPost}
                  onOpenImage={onOpenImage}
                />
                <Divider />
              </Box>
            </Collapse>
          );
        })}
      </TransitionGroup>
      <LinearProgress />
      <DialogPost title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
    </ScrollLayout>
  );
};

export default NotificationContainer;
