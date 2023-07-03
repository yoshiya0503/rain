import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Scroll from "@/components/Scroll";
import Layout from "@/templates/Layout";

export const Home = () => {
  const feed = useStore((state) => state.feed);
  const session = useStore((state) => state.session);
  const getProfile = useStore((state) => state.getProfile);
  const getTimeline = useStore((state) => state.getTimeline);
  const post = useStore((state) => state.post);

  useEffect(() => {
    getProfile(session.did);
    getTimeline();
  }, [getProfile, getTimeline, session]);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
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

export default Home;
