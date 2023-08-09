import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import FollowsContainer from "@/containers/FollowsContainer";
import TabLayout from "@/templates/TabLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Feeds = () => {
  const { handle } = useParams<"handle">();

  return (
    <Layout>
      <TabLayout labels={["follows", "followers"]}>
        <Suspense fallback={<TimelineTemplate />}>{handle && <FollowsContainer handle={handle} />}</Suspense>
        <div>followers</div>
      </TabLayout>
    </Layout>
  );
};

export default Feeds;
