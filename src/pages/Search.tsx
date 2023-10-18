import { Suspense } from "react";
import Layout from "@/templates/Layout";
import SearchContainer from "@/containers/SearchContainer";
import ScrollLayout from "@/templates/ScrollLayout";
import TabLayout from "@/templates/TabLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";

  return (
    <Layout>
      <ScrollLayout>
        <TabLayout labels={["posts", "users"]}>
          <Suspense fallback={<TimelineTemplate />}>
            <SearchContainer keyword={keyword} type="posts" />
          </Suspense>
          <Suspense fallback={<TimelineTemplate />}>
            <SearchContainer keyword={keyword} type="users" />
          </Suspense>
        </TabLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Search;
