import { Suspense } from "react";
import Layout from "@/templates/Layout";
import FeedsContainer from "@/containers/FeedsContainer";
import ScrollLayout from "@/templates/ScrollLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Feeds = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";

  return (
    <Layout>
      <ScrollLayout>
        <Suspense fallback={<TimelineTemplate />}>
          <FeedsContainer keyword={keyword} />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default Feeds;
