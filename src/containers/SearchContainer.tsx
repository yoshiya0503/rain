import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CenterLayout from "@/templates/CenterLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import DialogPost from "@/components/DialogPost";
import DialogImage from "@/components/DialogImage";
import NotFound from "@/components/NotFound";
import Post from "@/components/Post";
import Follow from "@/components/Follow";
import useDialog from "@/hooks/useDialog";
import { AppBskyFeedDefs, AppBskyEmbedImages } from "@atproto/api";

type Props = {
  keyword: string;
  type: "posts" | "users";
};

export const SearchContainer = (props: Props) => {
  const searchedPosts = useStore((state) => state.searchedPosts);
  const searchedActors = useStore((state) => state.searchedActors);
  const searchPost = useStore((state) => state.searchPost);
  const searchActor = useStore((state) => state.searchActor);
  const searchedKeyword = useStore((state) => state.searchedKeyword);
  const [isOpenPost, openPostDialog, closePostDialog] = useDialog();
  const [isOpenImage, openImageDialog, closeImageDialog] = useDialog();
  const [post, setPost] = useState<AppBskyFeedDefs.PostView>();
  const [images, setImages] = useState<AppBskyEmbedImages.ViewImage[]>();
  const [type, setType] = useState<"reply" | "quote">();

  if (_.isUndefined(undefined)) {
    // TODO suggest検索
  }

  if (props.keyword && searchedKeyword !== props.keyword) {
    throw Promise.all([searchPost(props.keyword), searchActor(props.keyword)]);
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

  const title = type === "reply" ? "Reply" : "Quote";

  if (_.isEmpty(searchedActors) || _.isEmpty(searchedPosts) || !props.keyword) {
    // TODO Tabの要素を検知してズレている
    return (
      <CenterLayout>
        <NotFound type="search" />
      </CenterLayout>
    );
  }

  return (
    <ScrollLayout>
      {props.type === "posts" &&
        _.map(searchedPosts, (post, key) => (
          <Box key={key} sx={{ mt: 1, mb: 1 }}>
            <Post post={post} onOpenPost={onOpenPost} onOpenImage={onOpenImage} />
            <Divider />
          </Box>
        ))}
      {props.type === "users" &&
        _.map(searchedActors, (actor, key) => (
          <Box key={key} sx={{ mt: 1, mb: 1 }}>
            <Follow profile={actor} />
            <Divider />
          </Box>
        ))}
      <DialogPost title={title} open={isOpenPost} post={post} type={type} onClose={closePostDialog} />
      <DialogImage open={isOpenImage} images={images} onClose={closeImageDialog} />
    </ScrollLayout>
  );
};

export default SearchContainer;
