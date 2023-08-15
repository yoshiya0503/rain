import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import FollowsContainer from "@/containers/FollowsContainer";
import TabLayout from "@/templates/TabLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Follows = () => {
  const { handle } = useParams<"handle">();

  return (
    <Layout>
      <TabLayout labels={["follows", "followers"]}>
        <Suspense fallback={<TimelineTemplate />}>
          {handle && <FollowsContainer handle={handle} type="follows" />}
        </Suspense>
        <Suspense fallback={<TimelineTemplate />}>
          {handle && <FollowsContainer handle={handle} type="followers" />}
        </Suspense>
      </TabLayout>
    </Layout>
  );
};

export default Follows;
