import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Scroll from "@/components/Scroll";
import Layout from "@/templates/Layout";

export const Home = () => {
  const feed = useStore((state) => state.feed);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);
  const post = useStore((state) => state.post);
  const deletePost = useStore((state) => state.deletePost);
  const repost = useStore((state) => state.repost);
  const deleteRepost = useStore((state) => state.deleteRepost);
  const like = useStore((state) => state.like);
  const deleteLike = useStore((state) => state.deleteLike);

  useEffect(() => {
    getInitialTimeline();
  }, [getInitialTimeline]);

  const onDeletePost = useCallback(
    (post: Post) => {
      deletePost(post);
    },
    [deletePost]
  );

  const onLike = useCallback(
    (post: Post) => {
      like(post);
    },
    [like]
  );

  const onDeleteLike = useCallback(
    (post: Post) => {
      deleteLike(post);
    },
    [deleteLike]
  );

  const onRepost = useCallback(
    (post: Post) => {
      repost(post);
    },
    [repost]
  );

  const onDeleteRepost = useCallback(
    (post: Post) => {
      deleteRepost(post);
    },
    [deleteRepost]
  );

  const onShare = useCallback((post: Post) => {
    const id = _.last(_.split(post.uri, "/"));
    const url = `https://bsky.app/profile/${post.author?.handle}/post/${id}`;
    navigator.clipboard.writeText(url);
  }, []);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
        {_.map(feed, (item, key) => {
          return (
            <Post
              key={key}
              post={item.post}
              onDeletePost={onDeletePost}
              onLike={onLike}
              onDeleteLike={onDeleteLike}
              onRepost={onRepost}
              onDeleteRepost={onDeleteRepost}
              onShare={onShare}
            />
          );
        })}
      </Scroll>
    </Layout>
  );
};

export default Home;
