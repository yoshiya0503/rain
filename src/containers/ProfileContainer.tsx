import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import DialogReport from "@/components/DialogReport";
import useDialog from "@/hooks/useDialog";
import useMe from "@/hooks/useMe";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

type Props = {
  handle: string;
};

export const ProfileContainer = (props: Props) => {
  const me = useMe();
  const actor = useStore((state) => state.actor);
  const authorFeed = useStore((state) => state.authorFeed);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);
  const [isOpenReport, openReportDialog, closeReportDialog] = useDialog();
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
  const [type, setType] = useState<"reply" | "quote">();
  const isOthers = actor?.handle !== props.handle;

  if (!actor || isOthers) {
    throw Promise.all([getProfile(props.handle), getAuthorFeed(props.handle, true)]);
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

  return (
    <>
      <Profile actor={actor} />
      <TransitionGroup>
        {_.map(authorFeed, (item) => (
          <Collapse key={item.post.cid}>
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
                item.reply?.parent.cid !== item.reply?.root.cid && (
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
      <DialogPost title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
      <DialogReport post={post} open={isOpenReport} onClose={closeReportDialog} />
    </>
  );
};

export default ProfileContainer;
