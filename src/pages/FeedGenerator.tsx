import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import FeedGeneratorContainer from "@/containers/FeedGeneratorContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Feeds = () => {
  const { did, id } = useParams();
  return (
    <Layout>
      <HistoryLayout>
        <Suspense fallback={<TimelineTemplate />}>
          <FeedGeneratorContainer did={did || ""} id={id || ""} />
        </Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default Feeds;
