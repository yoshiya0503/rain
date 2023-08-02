import Layout from "@/templates/Layout";
import { Suspense } from "react";
import FeedContainer from "@/containers/FeedContainer";
import FeedTemplate from "@/templates/FeedTemplate";
// TODO ポストが重複して出るバグが有る

export const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<FeedTemplate />}>
        <FeedContainer />
      </Suspense>
    </Layout>
  );
};

export default Home;
