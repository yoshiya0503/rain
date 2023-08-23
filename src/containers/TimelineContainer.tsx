import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Post from "@/components/Post";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

export const TimelineContainer = () => {
  const timeline = useStore((state) => state.timeline);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);
  const [isOpenPost, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isEmpty(timeline)) {
    throw getInitialTimeline();
  }

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

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
        {_.map(timeline, (item) => (
          <Collapse key={item.post.cid}>
            <Box sx={{ mt: 1, mb: 1 }}>
              {AppBskyFeedDefs.isPostView(item.reply?.root) && item.reply?.root && (
                <Post
                  post={item.reply.root}
                  onOpenPost={onOpenPost}
                  onOpenImage={onOpenImage}
                  reason={item.reason}
                  hasReply
                />
              )}
              {AppBskyFeedDefs.isPostView(item.reply?.parent) &&
                item.reply?.parent &&
                item.reply?.parent.cid !== item.reply?.root.cid && (
                  <Post
                    post={item.reply.parent}
                    onOpenPost={onOpenPost}
                    onOpenImage={onOpenImage}
                    reason={item.reason}
                    hasReply
                  />
                )}
              <Post post={item.post} onOpenPost={onOpenPost} onOpenImage={onOpenImage} reason={item.reason} />
              <Divider />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <LinearProgress sx={{ borderRadius: 1 }} />
      <DialogPost title={title} open={isOpenPost} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
    </ScrollLayout>
  );
};

export default TimelineContainer;
