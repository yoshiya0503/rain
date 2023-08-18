import { Suspense } from "react";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import NotificationsContainer from "@/containers/NotificationsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Notifications = () => {
  return (
    <Layout>
      <HistoryLayout>
        <Suspense fallback={<TimelineTemplate />}>
          <NotificationsContainer />
        </Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default Notifications;
