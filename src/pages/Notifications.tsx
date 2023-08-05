import Layout from "@/templates/Layout";
import { Suspense } from "react";
import NotificationContainer from "@/containers/NotificationContainer";
import FeedTemplate from "@/templates/FeedTemplate";

export const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<FeedTemplate />}>
        <NotificationContainer />
      </Suspense>
    </Layout>
  );
};

export default Home;
