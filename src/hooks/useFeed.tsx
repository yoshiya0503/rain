import _ from "lodash";
import { useState, useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyFeedDefs } from "@atproto/api";

export const useFeed = () => {
  const getFeedGenerator = useStore((state) => state.getFeedGenerator);

  const [feed, setFeed] = useState<AppBskyFeedDefs.GeneratorView>();

  const fetchFeedURI = useCallback((url: string) => {
    return _.chain(url)
      .replace("https://bsky.app/profile/", "at://")
      .replace("/feed/", "/app.bsky.feed.generator/")
      .value();
  }, []);

  const fetchFeed = useCallback(
    async (link: string) => {
      if (feed || !link) return;
      const feedURI = fetchFeedURI(link);
      const f = await getFeedGenerator(feedURI);
      setFeed(f);
    },
    [feed, setFeed, fetchFeedURI, getFeedGenerator]
  );

  const fetchEmbedFeed = useCallback(() => {
    const record = { uri: feed?.uri, cid: feed?.cid };
    return { record, $type: "app.bsky.embed.record" };
  }, [feed]);

  const onClearFeed = useCallback(() => {
    setFeed(undefined);
  }, [setFeed]);

  return { feed, fetchFeed, fetchEmbedFeed, onClearFeed };
};

export default useFeed;
