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
import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

export const TimelineContainer = () => {
  const feed = useStore((state) => state.feed);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isEmpty(feed)) {
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

  const title = type === "reply" ? "Reply" : "Quote";

  // TODO スクロール位置を記憶しておきたい
  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <TransitionGroup>
        {_.map(feed, (item) => (
          <Collapse key={item.post.cid}>
            <Box sx={{ mt: 1, mb: 1 }}>
              {AppBskyFeedDefs.isPostView(item.reply?.root) && item.reply?.root && (
                <Post post={item.reply.root} onOpenPost={onOpenPost} reason={item.reason} hasReply />
              )}
              {AppBskyFeedDefs.isPostView(item.reply?.parent) &&
                item.reply?.parent &&
                item.reply?.parent.cid !== item.reply?.root.cid && (
                  <Post post={item.reply.parent} onOpenPost={onOpenPost} reason={item.reason} hasReply />
                )}
              <Post post={item.post} onOpenPost={onOpenPost} reason={item.reason} />
              <Divider />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <LinearProgress />
      <PostDialog title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default TimelineContainer;
