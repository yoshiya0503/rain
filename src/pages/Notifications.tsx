import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import HeaderLayout from "@/templates/HeaderLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import NotificationsContainer from "@/containers/NotificationsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Notifications = () => {
  const listNotifications = useStore((state) => state.listNotifications);

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HeaderLayout history>
          <Suspense fallback={<TimelineTemplate />}>
            <NotificationsContainer />
          </Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Notifications;
