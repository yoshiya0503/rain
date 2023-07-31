import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import ScrollView from "@/templates/ScrollView";
import FeedContainer from "@/templates/FeedContainer";
import PostContainer from "@/templates/PostContainer";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
// TODO TransitionGroupが動いていない
// TODO ポストが重複して出るバグが有る

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

  return (
    <Layout>
      <ScrollView onScrollLimit={onScrollLimit}>
        <FeedContainer>
          <TransitionGroup>
            {_.map(feed, (item, key) => (
              <Collapse key={key}>
                <PostContainer>
                  {item.reply?.root && <Post post={item.reply.root} reason={item.reason} hasReply />}
                  {item.reply?.parent && item.reply?.parent.cid !== item.reply?.root.cid && (
                    <Post post={item.reply.parent} reason={item.reason} hasReply />
                  )}
                  {item.post && <Post post={item.post} reason={item.reason} />}
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
