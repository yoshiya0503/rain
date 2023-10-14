import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "@/templates/Layout";
import HeaderLayout from "@/templates/HeaderLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import NotificationsContainer from "@/containers/NotificationsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Notifications = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const listNotifications = useStore((state) => state.listNotifications);

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HeaderLayout menu={isPhone} history={!isPhone}>
          <Suspense fallback={<TimelineTemplate />}>
            <NotificationsContainer />
          </Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Notifications;
