import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  handle: string;
};

export const ProfileContainer = (props: Props) => {
  const actor = useStore((state) => state.actor);
  const authorFeed = useStore((state) => state.authorFeed);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const isOthers = actor?.handle !== props.handle;

  if (!actor || isOthers) {
    throw Promise.all([getProfile(props.handle), getAuthorFeed(props.handle, true)]);
  }

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(props.handle, false);
  }, [getAuthorFeed, props.handle]);

  const onReply = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      setPost(post);
      openPostDialog();
    },
    [openPostDialog, setPost]
  );

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Profile actor={actor} />
      <TransitionGroup>
        {_.map(authorFeed, (item) => (
          <Collapse key={item.post.cid}>
            <Box sx={{ mt: 1, mb: 1 }}>
              {item.reply?.root && <Post post={item.reply.root} onReply={onReply} reason={item.reason} hasReply />}
              {item.reply?.parent && item.reply?.parent.cid !== item.reply?.root.cid && (
                <Post post={item.reply.parent} onReply={onReply} reason={item.reason} hasReply />
              )}
              <Post post={item.post} onReply={onReply} reason={item.reason} />
              <Divider />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <LinearProgress />
      <PostDialog title="Reply" open={isOpen} post={post} type="reply" onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default ProfileContainer;
