import { Suspense } from "react";
import Layout from "@/templates/Layout";
import NotificationContainer from "@/containers/NotificationContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Notifications = () => {
  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <NotificationContainer />
      </Suspense>
    </Layout>
  );
};

export default Notifications;
