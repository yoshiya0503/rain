import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { Record, BlobRequest } from "@/stores/feed";
import { AppBskyFeedDefs } from "@atproto/api";

export const usePost = () => {
  const post = useStore((state) => state.post);
  const uploadBlob = useStore((state) => state.uploadBlob);
  const deletePost = useStore((state) => state.deletePost);
  const repost = useStore((state) => state.repost);
  const deleteRepost = useStore((state) => state.deleteRepost);
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);
  const updateFeedViewer = useStore((state) => state.updateFeedViewer);
  const updateAuthorFeedViewer = useStore((state) => state.updateAuthorFeedViewer);

  const onUploadBlob = useCallback(
    (data: BlobRequest) => {
      return uploadBlob(data);
    },
    [uploadBlob]
  );

  const onPost = useCallback(
    (record: Record) => {
      post(record);
    },
    [post]
  );

  const onDeletePost = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deletePost(post);
    },
    [deletePost]
  );

  const onLike = useCallback(
    async (post: AppBskyFeedDefs.PostView) => {
      const res = await like(post);
      updateFeedViewer(post, "like", res?.uri);
      updateAuthorFeedViewer(post, "like", res?.uri);
    },
    [like, updateFeedViewer, updateAuthorFeedViewer]
  );

  const onDeleteLike = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteLike(post);
      updateFeedViewer(post, "like");
      updateAuthorFeedViewer(post, "like");
    },
    [deleteLike, updateFeedViewer, updateAuthorFeedViewer]
  );

  const onRepost = useCallback(
    async (post: AppBskyFeedDefs.PostView) => {
      const res = await repost(post);
      updateFeedViewer(post, "repost", res?.uri);
      updateAuthorFeedViewer(post, "repost", res?.uri);
    },
    [repost, updateFeedViewer, updateAuthorFeedViewer]
  );

  const onDeleteRepost = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteRepost(post);
      updateFeedViewer(post, "repost");
      updateAuthorFeedViewer(post, "repost");
    },
    [deleteRepost, updateFeedViewer, updateAuthorFeedViewer]
  );

  const onShare = useCallback((post: AppBskyFeedDefs.PostView) => {
    const id = _.last(_.split(post.uri, "/"));
    const url = `https://bsky.app/profile/${post.author?.handle}/post/${id}`;
    navigator.clipboard.writeText(url);
  }, []);

  return { onUploadBlob, onPost, onDeletePost, onRepost, onDeleteRepost, onLike, onDeleteLike, onShare };
};

export default usePost;
