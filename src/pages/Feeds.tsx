import { Suspense } from "react";
import Layout from "@/templates/Layout";
import FeedsContainer from "@/containers/FeedsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Feeds = () => {
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <FeedsContainer />
      </Suspense>
    </Layout>
  );
};

export default Feeds;
