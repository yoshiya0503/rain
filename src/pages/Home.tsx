import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import Thread from "@/components/Thread";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import ScrollView from "@/templates/ScrollView";
import FeedContainer from "@/templates/FeedContainer";
import PostContainer from "@/templates/PostContainer";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
// TODO TransitionGroupが動いていない

export const Home = () => {
  const feed = useStore((state) => state.feed);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);

  useEffect(() => {
    getInitialTimeline();

    /*
    const id = setInterval(() => {
      getTimeline();
    }, 5000);
    return () => clearInterval(id);
      */
  }, [getInitialTimeline, getTimeline]);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  //<Thread post={item.post} reason={item.reason} />
  //<Thread post={item.post} reply={item.post} reason={item.reason} />

  return (
    <Layout>
      <ScrollView onScrollLimit={onScrollLimit}>
        <FeedContainer>
          <TransitionGroup>
            {_.map(feed, (item, key) => (
              <Collapse key={key}>
                <PostContainer>
                  <Post post={item.post} reason={item.reason} />
                </PostContainer>
              </Collapse>
            ))}
          </TransitionGroup>
        </FeedContainer>
      </ScrollView>
    </Layout>
  );
};

export default Home;
