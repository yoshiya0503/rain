import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import FeedGeneratorContainer from "@/containers/FeedGeneratorContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Feeds = () => {
  const { did, id } = useParams();
  const uri = `at://${did}/app.bsky.feed.generator/${id}`;
  const getFeed = useStore((state) => state.getFeed);

  const onScrollLimit = useCallback(() => {
    return getFeed(uri, false);
  }, [getFeed, uri]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HistoryLayout>
          <Suspense fallback={<TimelineTemplate />}>
            <FeedGeneratorContainer did={did || ""} id={id || ""} />
          </Suspense>
        </HistoryLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Feeds;
