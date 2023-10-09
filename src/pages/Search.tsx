import { Suspense } from "react";
import Layout from "@/templates/Layout";
import SearchContainer from "@/containers/SearchContainer";
import HistoryLayout from "@/templates/HistoryLayout";
import TabLayout from "@/templates/TabLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";

  return (
    <Layout>
      <HistoryLayout search>
        <TabLayout labels={["posts", "users"]}>
          <Suspense fallback={<TimelineTemplate />}>
            <SearchContainer keyword={keyword} type="posts" />
          </Suspense>
          <Suspense fallback={<TimelineTemplate />}>
            <SearchContainer keyword={keyword} type="users" />
          </Suspense>
        </TabLayout>
      </HistoryLayout>
    </Layout>
  );
};

export default Search;
