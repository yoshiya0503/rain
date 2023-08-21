import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import FeedGenerator from "@/components/FeedGenerator";
import Post from "@/components/Post";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

type Props = {
  did: string;
  id: string;
};

export const FeedGeneratorContainer = (props: Props) => {
  const feed = useStore((state) => state.feed);
  const feedGenerator = useStore((state) => state.feedGenerator);
  const preferences = useStore((state) => state.preferences);
  const getFeed = useStore((state) => state.getFeed);
  const getFeedGenerator = useStore((state) => state.getFeedGenerator);
  const getPreferences = useStore((state) => state.getPreferences);
  const updatePreferences = useStore((state) => state.updatePreferences);
  const [isOpen, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
  const [type, setType] = useState<"reply" | "quote">();
  const uri = `at://${props.did}/app.bsky.feed.generator/${props.id}`;
  const isOthers = feedGenerator?.uri !== uri;

  if (_.isEmpty(feedGenerator) || isOthers || _.isEmpty(preferences)) {
    throw Promise.all([getFeedGenerator(uri), getFeed(uri, true), getPreferences()]);
  }
  const onScrollLimit = useCallback(() => {
    return getFeed(uri, false);
  }, [getFeed, uri]);

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
      <FeedGenerator feed={feedGenerator} preferences={preferences} updatePreferences={updatePreferences} />
      {_.map(feed, (item) => (
        <Box key={item.post.cid} sx={{ mt: 1, mb: 1 }}>
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
      ))}
      <LinearProgress />
      <DialogPost title={title} open={isOpen} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
    </ScrollLayout>
  );
};

export default FeedGeneratorContainer;
