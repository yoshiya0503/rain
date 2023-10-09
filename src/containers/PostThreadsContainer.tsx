import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ScrollLayout from "@/templates/ScrollLayout";
import CenterLayout from "@/templates/CenterLayout";
import Post from "@/components/Post";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import DialogReport from "@/components/DialogReport";
import NotFound from "@/components/NotFound";
import useDialog from "@/hooks/useDialog";
import useMe from "@/hooks/useMe";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

type Props = {
  handle: string;
  id: string;
};

export const PostThreadsContainer = (props: Props) => {
  const me = useMe();
  const thread = useStore((state) => state.thread);
  const threadSubject = useStore((state) => state.threadSubject);
  const threadParent = useStore((state) => state.threadParent);
  const threadReplies = useStore((state) => state.threadReplies);
  const resolveHandle = useStore((state) => state.resolveHandle);
  const getPostThread = useStore((state) => state.getPostThread);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [isOpenReport, openReportDialog, closeReportDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
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

  if (_.isEmpty(thread)) {
    return (
      <CenterLayout>
        <NotFound type="thread" />
      </CenterLayout>
    );
  }

  // TODO ページ遷移にアニメーションを付けたい
  return (
    <ScrollLayout>
      <Box sx={{ mt: 1, mb: 1 }}>
        {_.map(threadParent, (item) => (
          <Post
            key={item.cid}
            me={me}
            post={item}
            onOpenPost={onOpenPost}
            onOpenImage={onOpenImage}
            onOpenReport={onOpenReport}
            hasReply
          />
        ))}
        <Post
          me={me}
          post={thread.post}
          onOpenPost={onOpenPost}
          onOpenImage={onOpenImage}
          onOpenReport={onOpenReport}
          showStats
        />
        <Divider />
      </Box>
      {_.map(threadReplies, (reply, key) => (
        <Box key={key} sx={{ mt: 1, mb: 1 }}>
          {_.map(reply, (item, index) => (
            <Post
              me={me}
              key={item.cid}
              post={item}
              onOpenPost={onOpenPost}
              onOpenImage={onOpenImage}
              onOpenReport={onOpenReport}
              hasReply={_.size(reply) - 1 !== index}
            />
          ))}
          <Divider />
        </Box>
      ))}
      <DialogPost title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
      <DialogReport post={post} open={isOpenReport} onClose={closeReportDialog} />
    </ScrollLayout>
  );
};

export default PostThreadsContainer;
