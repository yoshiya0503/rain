import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { Record, BlobRequest } from "@/stores/feed";
import { AppBskyFeedDefs } from "@atproto/api";

export const usePost = () => {
  const navigate = useNavigate();
  const post = useStore((state) => state.post);
  const uploadBlob = useStore((state) => state.uploadBlob);
  const deletePost = useStore((state) => state.deletePost);
  const repost = useStore((state) => state.repost);
  const deleteRepost = useStore((state) => state.deleteRepost);
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);
  const updateFeedViewer = useStore((state) => state.updateFeedViewer);
  const updateAuthorFeedViewer = useStore((state) => state.updateAuthorFeedViewer);
  const updateNotificationViewer = useStore((state) => state.updateNotificationViewer);
  const updatePostThreadViewer = useStore((state) => state.updatePostThreadViewer);

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
      updateNotificationViewer(post, "like", res?.uri);
      updatePostThreadViewer(post, "like", res?.uri);
    },
    [like, updateFeedViewer, updateAuthorFeedViewer, updateNotificationViewer, updatePostThreadViewer]
  );

  const onDeleteLike = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteLike(post);
      updateFeedViewer(post, "like");
      updateAuthorFeedViewer(post, "like");
      updateNotificationViewer(post, "like");
      updatePostThreadViewer(post, "like");
    },
    [deleteLike, updateFeedViewer, updateAuthorFeedViewer, updateNotificationViewer, updatePostThreadViewer]
  );

  const onRepost = useCallback(
    async (post: AppBskyFeedDefs.PostView) => {
      const res = await repost(post);
      updateFeedViewer(post, "repost", res?.uri);
      updateAuthorFeedViewer(post, "repost", res?.uri);
      updateNotificationViewer(post, "repost", res?.uri);
      updatePostThreadViewer(post, "repost", res?.uri);
    },
    [repost, updateFeedViewer, updateAuthorFeedViewer, updateNotificationViewer, updatePostThreadViewer]
  );

  const onDeleteRepost = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteRepost(post);
      updateFeedViewer(post, "repost");
      updateAuthorFeedViewer(post, "repost");
      updateNotificationViewer(post, "repost");
      updatePostThreadViewer(post, "repost");
    },
    [deleteRepost, updateFeedViewer, updateAuthorFeedViewer, updateNotificationViewer, updatePostThreadViewer]
  );

  const onShare = useCallback((post: AppBskyFeedDefs.PostView) => {
    const id = _.last(_.split(post.uri, "/"));
    const url = `https://bsky.app/profile/${post.author?.handle}/post/${id}`;
    navigator.clipboard.writeText(url);
  }, []);

  const onViewThread = useCallback(
    (post: { uri: string; author: { handle: string } }) => () => {
      if (document.getSelection()?.toString()) return;
      const id = _.last(_.split(post.uri, "/"));
      const url = `/profile/${post.author.handle}/post/${id}`;
      navigate(url);
    },
    [navigate]
  );

  return { onUploadBlob, onPost, onDeletePost, onRepost, onDeleteRepost, onLike, onDeleteLike, onShare, onViewThread };
};

export default usePost;
