import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import ScrollLayout from "@/templates/ScrollLayout";
import Post from "@/components/Post";
import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

export const FeedContainer = () => {
  const feed = useStore((state) => state.feed);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [replyPost, setReplyPost] = useState<AppBskyFeedDefs.PostView>();
  const [replyThread, setReplyThread] = useState<AppBskyFeedDefs.FeedViewPost>();

  if (_.isEmpty(feed)) {
    throw getInitialTimeline();
  }

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  const onReply = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      const thread = _.find(feed, (item) => {
        const atPost = item.post.uri === post.uri;
        const atRoot = item.reply?.root.uri === post.uri;
        const atParent = item.reply?.parent.uri === post.uri;
        return atPost || atRoot || atParent;
      });
      setReplyPost(post);
      setReplyThread(thread);
      openPostDialog();
    },
    [openPostDialog, setReplyThread, feed]
  );

  console.log(feed);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <TransitionGroup>
          {_.map(feed, (item) => (
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

export default FeedContainer;
