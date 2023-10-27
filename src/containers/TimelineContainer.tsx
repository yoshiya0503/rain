import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import Post from "@/components/Post";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import DialogReport from "@/components/DialogReport";
import UnreadPosts from "@/components/UnreadPosts";
import useDialog from "@/hooks/useDialog";
import useMe from "@/hooks/useMe";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

export const TimelineContainer = () => {
  const me = useMe();
  const timeline = useStore((state) => state.timeline);
  const unreadTimeline = useStore((state) => state.unreadTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);
  const drainTimeline = useStore((state) => state.drainTimeline);
  const [isOpenPost, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [isOpenReport, openReportDialog, closeReportDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isEmpty(timeline)) {
    throw getInitialTimeline();
  }

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

  const onOpenReport = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      setPost(post);
      openReportDialog();
    },
    [openReportDialog, setPost]
  );

  const title = type === "reply" ? "Reply" : "Quote";

  // TODO 投稿後にcidのpostがundefinedになることがある
  return (
    <>
      <TransitionGroup>
        {_.size(unreadTimeline) ? (
          <Collapse key="unread">
            <UnreadPosts onClick={drainTimeline} unread={unreadTimeline} />
          </Collapse>
        ) : null}
        {_.map(timeline, (item) => (
          <Collapse key={item.post?.cid}>
            <Box sx={{ mt: 1, mb: 1 }}>
              {AppBskyFeedDefs.isPostView(item.reply?.root) && item.reply?.root && (
                <Post
                  me={me}
                  post={item.reply.root}
                  onOpenPost={onOpenPost}
                  onOpenImage={onOpenImage}
                  onOpenReport={onOpenReport}
                  reason={item.reason}
                  hasReply
                />
              )}
              {AppBskyFeedDefs.isPostView(item.reply?.parent) &&
                item.reply?.parent &&
                item.reply?.parent?.cid !== item.reply?.root?.cid && (
                  <Post
                    me={me}
                    post={item.reply.parent}
                    onOpenPost={onOpenPost}
                    onOpenImage={onOpenImage}
                    onOpenReport={onOpenReport}
                    reason={item.reason}
                    hasReply
                  />
                )}
              <Post
                me={me}
                post={item.post}
                onOpenPost={onOpenPost}
                onOpenImage={onOpenImage}
                onOpenReport={onOpenReport}
                reason={item.reason}
              />
              <Divider />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <LinearProgress sx={{ borderRadius: 1, mb: 10 }} />
      <DialogPost title={title} open={isOpenPost} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
      <DialogReport post={post} open={isOpenReport} onClose={closeReportDialog} />
    </>
  );
};

export default TimelineContainer;
