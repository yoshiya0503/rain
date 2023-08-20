import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollLayout from "@/templates/ScrollLayout";
import Feed from "@/components/Feed";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { AppBskyFeedDefs } from "@atproto/api";

export const FeedsContainer = () => {
  const feedGenerators = useStore((state) => state.feedGenerators);
  const feedBrief = useStore((state) => state.feedBrief);
  const preferences = useStore((state) => state.preferences);
  const getFeedGenerators = useStore((state) => state.getFeedGenerators);
  const getFeedBrief = useStore((state) => state.getFeedBrief);
  const getPreferences = useStore((state) => state.getPreferences);
  const updatePreferences = useStore((state) => state.updatePreferences);
  const [expanded, setExpanded] = useState<string>();

  if (_.isEmpty(feedGenerators) || _.isEmpty(preferences)) {
    throw Promise.all([getFeedGenerators(""), getPreferences()]);
  }
  const onSearchFeeds = useCallback(() => {
    console.log("search");
  }, []);

  const onChangeFeed = useCallback(
    (feed: AppBskyFeedDefs.GeneratorView) => {
      getFeedBrief(feed.uri);
      setExpanded(feed.uri);
    },
    [getFeedBrief, setExpanded]
  );

  const onScrollLimit = useCallback(() => {
    return getFeedGenerators("");
  }, [getFeedGenerators]);

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      {_.map(feedGenerators, (feedGenerator, index) => (
        <Box key={index} sx={{ mt: 1, mb: 1 }}>
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
      <LinearProgress />
    </ScrollLayout>
  );
};

export default FeedsContainer;
