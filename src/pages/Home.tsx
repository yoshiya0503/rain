import Layout from "@/templates/Layout";
import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import FeedContainer from "@/containers/FeedContainer";
// TODO ポストが重複して出るバグが有る

export const Home = () => {
  return (
    <Layout>
      <Suspense fallback={<LinearProgress />}>
        <FeedContainer />
      </Suspense>
    </Layout>
  );
};

export default Home;
