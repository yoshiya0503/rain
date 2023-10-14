import { Suspense } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "@/templates/Layout";
import FeedsContainer from "@/containers/FeedsContainer";
import ScrollLayout from "@/templates/ScrollLayout";
import HeaderLayout from "@/templates/HeaderLayout";
import TimelineTemplate from "@/templates/TimelineTemplate";
import useQuery from "@/hooks/useQuery";

export const Feeds = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <ScrollLayout>
        <HeaderLayout menu={isPhone} history={!isPhone} search={isPhone}>
          <Suspense fallback={<TimelineTemplate />}>
            <FeedsContainer keyword={keyword} />
          </Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Feeds;
