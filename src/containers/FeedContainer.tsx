import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import ScrollLayout from "@/templates/ScrollLayout";
import Post from "@/components/Post";

export const FeedContainer = () => {
  const feed = useStore((state) => state.feed);
  const getTimeline = useStore((state) => state.getTimeline);
  const getInitialTimeline = useStore((state) => state.getInitialTimeline);

  if (_.isEmpty(feed)) {
    throw getInitialTimeline();
  }

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <TransitionGroup>
          {_.map(feed, (item) => (
            <Collapse key={item.post.cid}>
              <Box sx={{ mt: 1, mb: 1 }}>
                {item.reply?.root && <Post post={item.reply.root} reason={item.reason} hasReply />}
                {item.reply?.parent && item.reply?.parent.cid !== item.reply?.root.cid && (
                  <Post post={item.reply.parent} reason={item.reason} hasReply />
                )}
                <Post post={item.post} reason={item.reason} />
                <Divider />
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
        <LinearProgress />
      </Box>
    </ScrollLayout>
  );
};

export default FeedContainer;
