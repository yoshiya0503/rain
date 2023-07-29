import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import ScrollView from "@/templates/ScrollView";
import FeedContainer from "@/templates/FeedContainer";
import PostContainer from "@/templates/PostContainer";

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
        <FeedContainer>
          {_.map(feed, (item, key) => (
            <PostContainer>
              <Post key={key} post={item.post} />
            </PostContainer>
          ))}
        </FeedContainer>
      </ScrollView>
    </Layout>
  );
};

export default Home;
