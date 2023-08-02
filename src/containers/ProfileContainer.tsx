import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Profile from "@/components/Profile";
import Post from "@/components/Post";

type Props = {
  handle: string;
};

export const ProfileContainer = (props: Props) => {
  const authorFeed = useStore((state) => state.authorFeed);
  const actor = useStore((state) => state.actor);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);

  if (!actor || actor.handle !== props.handle) {
    throw Promise.all([getProfile(props.handle), getAuthorFeed(props.handle, true)]);
  }

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(props.handle, false);
  }, [getAuthorFeed, props.handle]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <Box sx={{ maxWidth: 480 }}>
        <Profile handle={props.handle} />
        <TransitionGroup>
          {_.map(authorFeed, (item) => (
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

export default ProfileContainer;
