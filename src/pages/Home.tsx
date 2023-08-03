import Layout from "@/templates/Layout";
import { Suspense } from "react";
import FeedContainer from "@/containers/FeedContainer";
import FeedTemplate from "@/templates/FeedTemplate";

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
