import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import FollowsContainer from "@/containers/FollowsContainer";
import TabLayout from "@/templates/TabLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Follows = () => {
  const { handle } = useParams<"handle">();
  const getFollows = useStore((state) => state.getFollows);
  const getFollowers = useStore((state) => state.getFollowers);

  const onScrollLimit = useCallback(
    (type: string) => () => {
      if (type === "follows") return getFollows(handle || "", false);
      if (type === "followers") return getFollowers(handle || "", false);
    },
    [getFollows, getFollowers, handle]
  );

  return (
    <Layout>
      <TabLayout labels={["follows", "followers"]}>
        <Suspense fallback={<TimelineTemplate />}>
          <ScrollLayout onScrollLimit={onScrollLimit("follows")}>
            {handle && <FollowsContainer handle={handle} type="follows" />}
          </ScrollLayout>
        </Suspense>
        <Suspense fallback={<TimelineTemplate />}>
          <ScrollLayout onScrollLimit={onScrollLimit("followers")}>
            {handle && <FollowsContainer handle={handle} type="followers" />}
          </ScrollLayout>
        </Suspense>
      </TabLayout>
    </Layout>
  );
};

export default Follows;
