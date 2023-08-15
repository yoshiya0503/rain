import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ScrollLayout from "@/templates/ScrollLayout";
import Post from "@/components/Post";
import PostDialog from "@/components/PostDialog";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  handle: string;
  id: string;
};

export const PostThreadsContainer = (props: Props) => {
  const thread = useStore((state) => state.thread);
  const threadSubject = useStore((state) => state.threadSubject);
  const resolveHandle = useStore((state) => state.resolveHandle);
  const getPostThread = useStore((state) => state.getPostThread);
  const walkParents = useStore((state) => state.walkParents);
  const walkReplies = useStore((state) => state.walkReplies);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isEmpty(thread) || threadSubject !== props.id) {
    throw (async () => {
      const did = await resolveHandle(props.handle);
      await getPostThread(`at://${did}/app.bsky.feed.post/${props.id}`);
    })();
  }

  const onOpenPost = useCallback(
    (post: AppBskyFeedDefs.PostView, type: "reply" | "quote") => {
      setPost(post);
      setType(type);
      openPostDialog();
    },
    [openPostDialog, setPost, setType]
  );

  const title = type === "reply" ? "Reply" : "Quote";

  // TODO 元の位置へ戻る機能
  return (
    <ScrollLayout>
      <Box sx={{ mt: 1, mb: 1 }}>
        {AppBskyFeedDefs.isThreadViewPost(thread.parent) &&
          _.map(walkParents(thread.parent), (item) => (
            <Post key={item.cid} post={item} onOpenPost={onOpenPost} hasReply />
          ))}
        <Post post={thread.post} onOpenPost={onOpenPost} />
        <Divider />
      </Box>
      {_.map(thread.replies, (reply, key) => (
        <Box key={key} sx={{ mt: 1, mb: 1 }}>
          {AppBskyFeedDefs.isThreadViewPost(reply) &&
            _.map(walkReplies(reply), (item, len) => (
              <Post
                key={item.cid}
                post={item}
                onOpenPost={onOpenPost}
                hasReply={_.size(walkReplies(reply)) - 1 !== len}
              />
            ))}
          <Divider />
        </Box>
      ))}
      <PostDialog title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default PostThreadsContainer;
