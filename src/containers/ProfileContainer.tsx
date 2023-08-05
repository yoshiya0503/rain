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
  const authorFeed = useStore((state) => state.authorFeed);
  const actor = useStore((state) => state.actor);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [replyPost, setReplyPost] = useState<AppBskyFeedDefs.PostView>();
  const [replyThread, setReplyThread] = useState<AppBskyFeedDefs.FeedViewPost>();

  if (!actor || actor.handle !== props.handle) {
    throw Promise.all([getProfile(props.handle), getAuthorFeed(props.handle, true)]);
  }

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(props.handle, false);
  }, [getAuthorFeed, props.handle]);

  const onReply = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      const thread = _.find(authorFeed, (item) => {
        const atPost = item.post.uri === post.uri;
        const atRoot = item.reply?.root.uri === post.uri;
        const atParent = item.reply?.parent.uri === post.uri;
        return atPost || atRoot || atParent;
      });
      setReplyPost(post);
      setReplyThread(thread);
      openPostDialog();
    },
    [openPostDialog, setReplyThread, authorFeed]
  );

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <Profile handle={props.handle} />
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
      </Box>
      <PostDialog title="Reply" open={isOpen} post={replyPost} thread={replyThread} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default ProfileContainer;
