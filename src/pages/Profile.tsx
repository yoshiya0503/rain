import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import Scroll from "@/components/Scroll";
import Profile from "@/components/Profile";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();
  const feed = useStore((state) => state.feed);
  const actor = useStore((state) => state.actor);
  const me = useStore((state) => state.me);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);
  const post = useStore((state) => state.post);

  useEffect(() => {
    getProfile(handle || "");
    getAuthorFeed(handle || "");
  }, [getProfile, getAuthorFeed, handle]);

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(handle || "");
  }, [getAuthorFeed, handle]);

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
        <Profile actor={actor} me={me} />
        {_.map(feed, (item, key) => {
          if (item.reply) {
            return <Post key={key} post={item.reply.root} />;
          }
          return <Post key={key} post={item.post} />;
        })}
      </Scroll>
    </Layout>
  );
};

export default ProfilePage;
