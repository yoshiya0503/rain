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
  const updateTimelineViewer = useStore((state) => state.updateTimelineViewer);
  const updateAuthorFeedViewer = useStore((state) => state.updateAuthorFeedViewer);
  const updateNotificationViewer = useStore((state) => state.updateNotificationViewer);
  const updatePostThreadViewer = useStore((state) => state.updatePostThreadViewer);
  const updateSearchViewer = useStore((state) => state.updateSearchViewer);

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

  const updateViewer = useCallback(
    (post: AppBskyFeedDefs.PostView, action: "like" | "repost", resourceURI?: string) => {
      if (_.has(post.viewer, action)) {
        if (_.isNumber(post.likeCount) && action === "like") {
          post.likeCount -= 1;
        }
        if (_.isNumber(post.repostCount) && action === "repost") {
          post.repostCount -= 1;
        }
        post.viewer = _.omit(post.viewer, action);
      } else {
        if (_.isNumber(post.likeCount) && action === "like") {
          post.likeCount += 1;
        }
        if (_.isNumber(post.repostCount) && action === "repost") {
          post.repostCount += 1;
        }
        post.viewer = { ...post.viewer, [action]: resourceURI };
      }
      updateTimelineViewer(post);
      updateAuthorFeedViewer(post);
      updateNotificationViewer(post);
      updatePostThreadViewer(post);
      updateSearchViewer(post);
    },
    [updateTimelineViewer, updateAuthorFeedViewer, updateNotificationViewer, updatePostThreadViewer, updateSearchViewer]
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
      updateViewer(post, "like", res?.uri);
    },
    [like, updateViewer]
  );

  const onDeleteLike = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteLike(post);
      updateViewer(post, "like");
    },
    [deleteLike, updateViewer]
  );

  const onRepost = useCallback(
    async (post: AppBskyFeedDefs.PostView) => {
      const res = await repost(post);
      updateViewer(post, "repost", res?.uri);
    },
    [repost, updateViewer]
  );

  const onDeleteRepost = useCallback(
    (post: AppBskyFeedDefs.PostView) => {
      deleteRepost(post);
      updateViewer(post, "repost");
    },
    [deleteRepost, updateViewer]
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
      //TODO 同じページへのnavigateをスキップしないと履歴に積まれる
      navigate(url);
    },
    [navigate]
  );

  return { onUploadBlob, onPost, onDeletePost, onRepost, onDeleteRepost, onLike, onDeleteLike, onShare, onViewThread };
};

export default usePost;
