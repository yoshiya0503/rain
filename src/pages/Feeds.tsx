import { Suspense } from "react";
import Layout from "@/templates/Layout";
import FeedsContainer from "@/containers/FeedsContainer";
import ScrollLayout from "@/templates/ScrollLayout";
import HistoryLayout from "@/templates/HistoryLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Feeds = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";

  return (
    <Layout>
      <ScrollLayout>
        <HistoryLayout search>
          <Suspense fallback={<TimelineTemplate />}>
            <FeedsContainer keyword={keyword} />
          </Suspense>
        </HistoryLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Feeds;
