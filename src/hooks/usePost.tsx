import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyFeedPost } from "@atproto/api";
import { PostView } from "@/stores/feed";

export const usePost = () => {
  const post = useStore((state) => state.post);
  const deletePost = useStore((state) => state.deletePost);
  const repost = useStore((state) => state.repost);
  const deleteRepost = useStore((state) => state.deleteRepost);
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);

  const onPost = useCallback(
    (record: AppBskyFeedPost.Record) => {
      post(record);
    },
    [post]
  );

  const onDeletePost = useCallback(
    (post: PostView) => {
      deletePost(post);
    },
    [deletePost]
  );

  const onLike = useCallback(
    (post: PostView) => {
      like(post);
    },
    [like]
  );

  const onDeleteLike = useCallback(
    (post: PostView) => {
      deleteLike(post);
    },
    [deleteLike]
  );

  const onRepost = useCallback(
    (post: PostView) => {
      repost(post);
    },
    [repost]
  );

  const onDeleteRepost = useCallback(
    (post: PostView) => {
      deleteRepost(post);
    },
    [deleteRepost]
  );

  const onShare = useCallback((post: PostView) => {
    const id = _.last(_.split(post.uri, "/"));
    const url = `https://bsky.app/profile/${post.author?.handle}/post/${id}`;
    navigator.clipboard.writeText(url);
  }, []);

  return { onPost, onDeletePost, onRepost, onDeleteRepost, onLike, onDeleteLike, onShare };
};

export default usePost;
