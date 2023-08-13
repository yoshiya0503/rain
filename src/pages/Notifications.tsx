import { Suspense } from "react";
import Layout from "@/templates/Layout";
import NotificationsContainer from "@/containers/NotificationsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Notifications = () => {
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <NotificationsContainer />
      </Suspense>
    </Layout>
  );
};

export default Notifications;
