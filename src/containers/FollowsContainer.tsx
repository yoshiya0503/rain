import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Follow from "@/components/Follow";

type Props = {
  handle: string;
};

export const FollowsContainer = (props: Props) => {
  const follows = useStore((state) => state.follows);
  const getFollows = useStore((state) => state.getFollows);
  const getFollowers = useStore((state) => state.getFollowers);

  if (_.isEmpty(follows)) {
    throw getFollows(props.handle);
  }

  const onScrollLimit = useCallback(() => {
    getFollows(props.handle);
  }, [getFollows, props.handle]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      <TransitionGroup>
        {_.map(follows, (item) => {
          return (
            <Collapse key={item.did}>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Follow profile={item} />
              </Box>
              <Divider />
            </Collapse>
          );
        })}
      </TransitionGroup>
      <LinearProgress />
    </ScrollLayout>
  );
};

export default FollowsContainer;
