import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import TimelineContainer from "@/containers/TimelineContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Home = () => {
  const getTimeline = useStore((state) => state.getTimeline);
  const unreadTimeline = useStore((state) => state.unreadTimeline);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit} unread={unreadTimeline}>
        <Suspense fallback={<TimelineTemplate />}>
          <TimelineContainer />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default Home;
