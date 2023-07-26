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

  useEffect(() => {
    getInitialTimeline();
  }, [getInitialTimeline]);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Layout>
      <Scroll onScrollLimit={onScrollLimit}>
        {_.map(feed, (item, key) => {
          return <Post key={key} post={item.post} />;
        })}
      </Scroll>
    </Layout>
  );
};

export default Home;
