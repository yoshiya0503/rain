import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import LinearProgress from "@mui/material/LinearProgress";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import ScrollView from "@/templates/ScrollView";

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
      <ScrollView onScrollLimit={onScrollLimit}>
        {_.map(feed, (item, key) => {
          return <Post key={key} post={item.post} />;
        })}
      </ScrollView>
    </Layout>
  );
};

export default Home;
