import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Notification from "@/components/Notification";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";

export const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const listNotifications = useStore((state) => state.listNotifications);

  useEffect(() => {
    listNotifications();
  }, [listNotifications]);

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        {_.map(notifications, (item, key) => {
          return <Notification key={key} notification={item} />;
        })}
      </ScrollLayout>
    </Layout>
  );
};

export default Notifications;
