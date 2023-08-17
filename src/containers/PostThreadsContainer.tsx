import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ScrollLayout from "@/templates/ScrollLayout";
import CenterLayout from "@/templates/CenterLayout";
import Post from "@/components/Post";
import PostDialog from "@/components/PostDialog";
import NotFound from "@/components/NotFound";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  handle: string;
  id: string;
};

export const PostThreadsContainer = (props: Props) => {
  const thread = useStore((state) => state.thread);
  const threadSubject = useStore((state) => state.threadSubject);
  const threadParent = useStore((state) => state.threadParent);
  const threadReplies = useStore((state) => state.threadReplies);
  const resolveHandle = useStore((state) => state.resolveHandle);
  const getPostThread = useStore((state) => state.getPostThread);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [type, setType] = useState<"reply" | "quote">();

  if (threadSubject !== props.id) {
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

  if (_.isEmpty(thread)) {
    return (
      <CenterLayout>
        <NotFound type="thread" />
      </CenterLayout>
    );
  }

  // TODO 元の位置へ戻る機能
  // ページ遷移にアニメーションを付けたい
  return (
    <ScrollLayout>
      <Box sx={{ mt: 1, mb: 1 }}>
        {_.map(threadParent, (item) => (
          <Post key={item.cid} post={item} onOpenPost={onOpenPost} hasReply />
        ))}
        <Post post={thread.post} onOpenPost={onOpenPost} showStats />
        <Divider />
      </Box>
      {_.map(threadReplies, (reply, key) => (
        <Box key={key} sx={{ mt: 1, mb: 1 }}>
          {_.map(reply, (item, index) => (
            <Post key={item.cid} post={item} onOpenPost={onOpenPost} hasReply={_.size(reply) - 1 !== index} />
          ))}
          <Divider />
        </Box>
      ))}
      <PostDialog title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
    </ScrollLayout>
  );
};

export default PostThreadsContainer;
