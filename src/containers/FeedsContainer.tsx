import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Feed from "@/components/Feed";
import { AppBskyFeedDefs } from "@atproto/api";

type Props = {
  keyword: string;
};

export const FeedsContainer = (props: Props) => {
  const feedGenerators = useStore((state) => state.feedGenerators);
  const query = useStore((state) => state.query);
  const feedBrief = useStore((state) => state.feedBrief);
  const preferences = useStore((state) => state.preferences);
  const getFeedGenerators = useStore((state) => state.getFeedGenerators);
  const getFeedBrief = useStore((state) => state.getFeedBrief);
  const getPreferences = useStore((state) => state.getPreferences);
  const updatePreferences = useStore((state) => state.updatePreferences);
  const [expanded, setExpanded] = useState<string>();

  if (_.isUndefined(query)) {
    throw Promise.all([getFeedGenerators(props.keyword), getPreferences()]);
  }
  if (query !== props.keyword) {
    throw getFeedGenerators(props.keyword);
  }

  const onChangeFeed = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView) => {
      getFeedBrief(feed.uri);
      setExpanded(feed.uri);
    },
    [getFeedBrief, setExpanded]
  );

  return (
    <>
      {_.map(feedGenerators, (feedGenerator, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Feed
            feed={feedGenerator}
            preferences={preferences}
            updatePreferences={updatePreferences}
            feedBrief={feedBrief}
            onChangeFeed={onChangeFeed}
            expanded={expanded === feedGenerator.uri}
          />
        </Box>
      ))}
      <LinearProgress sx={{ borderRadius: 1, mb: 10 }} />
    </>
  );
};

export default FeedsContainer;
