import { Suspense } from "react";
import Layout from "@/templates/Layout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchContainer from "@/containers/SearchContainer";
import ScrollLayout from "@/templates/ScrollLayout";
import HeaderLayout from "@/templates/HeaderLayout";
import TabLayout from "@/templates/TabLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <ScrollLayout>
        <HeaderLayout menu={isPhone} history={!isPhone} search={isPhone}>
          <TabLayout labels={["posts", "users"]}>
            <Suspense fallback={<TimelineTemplate />}>
              <SearchContainer keyword={keyword} type="posts" />
            </Suspense>
            <Suspense fallback={<TimelineTemplate />}>
              <SearchContainer keyword={keyword} type="users" />
            </Suspense>
          </TabLayout>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Search;
