import { Suspense } from "react";
import Layout from "@/templates/Layout";
import FeedsContainer from "@/containers/FeedsContainer";
import HistoryLayout from "@/templates/HistoryLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Search = () => {
  const query = useQuery();

  return (
    <Layout>
      <HistoryLayout search>
        <Suspense fallback={<TimelineTemplate />}>
          <FeedsContainer keyword={query.get("q") || ''} />
        </Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default Search;
