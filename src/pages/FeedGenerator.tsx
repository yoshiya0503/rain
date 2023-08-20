import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import FeedGeneratorContainer from "@/containers/FeedGeneratorContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Feeds = () => {
  const { did, id } = useParams();
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <FeedGeneratorContainer did={did || ""} id={id || ""} />
      </Suspense>
    </Layout>
  );
};

export default Feeds;
