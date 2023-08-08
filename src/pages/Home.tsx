import { Suspense } from "react";
import Layout from "@/templates/Layout";
import TimelineContainer from "@/containers/TimelineContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <TimelineContainer />
      </Suspense>
    </Layout>
  );
};

export default Home;
