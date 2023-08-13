import { Suspense } from "react";
import Layout from "@/templates/Layout";
import TimelineContainer from "@/containers/TimelineContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const PostThreads = () => {
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <TimelineContainer />
      </Suspense>
    </Layout>
  );
};

export default PostThreads;
