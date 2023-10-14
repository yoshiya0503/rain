import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import HeaderLayout from "@/templates/HeaderLayout";
import TimelineContainer from "@/containers/TimelineContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Home = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const getTimeline = useStore((state) => state.getTimeline);
  const unreadTimeline = useStore((state) => state.unreadTimeline);

  const onScrollLimit = useCallback(() => {
    getTimeline();
  }, [getTimeline]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit} unread={unreadTimeline}>
        {isPhone && (
          <HeaderLayout menu>
            <Suspense fallback={<TimelineTemplate />}>
              <TimelineContainer />
            </Suspense>
          </HeaderLayout>
        )}
        {!isPhone && (
          <Suspense fallback={<TimelineTemplate />}>
            <TimelineContainer />
          </Suspense>
        )}
      </ScrollLayout>
    </Layout>
  );
};

export default Home;
