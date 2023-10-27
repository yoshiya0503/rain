import _ from "lodash";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import Follow from "@/components/Follow";

type Props = {
  handle: string;
  type: "follows" | "followers";
};

export const FollowsContainer = (props: Props) => {
  const subject = useStore((state) => state.followSubject);
  const follows = useStore((state) => state.follows);
  const followers = useStore((state) => state.followers);
  const getFollows = useStore((state) => state.getFollows);
  const getFollowers = useStore((state) => state.getFollowers);

  if (subject?.handle !== props.handle) {
    throw Promise.all([getFollows(props.handle, true), getFollowers(props.handle, true)]);
  }

  return (
    <>
      <TransitionGroup>
        {props.type === "follows" &&
          _.map(follows, (item) => (
            <Collapse key={item.did}>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Follow profile={item} />
              </Box>
              <Divider />
            </Collapse>
          ))}
        {props.type === "followers" &&
          _.map(followers, (item) => (
            <Collapse key={item.did}>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Follow profile={item} />
              </Box>
              <Divider />
            </Collapse>
          ))}
      </TransitionGroup>
      <LinearProgress sx={{ borderRadius: 1, mb: 10 }} />
    </>
  );
};

export default FollowsContainer;
