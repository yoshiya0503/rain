import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Notification from "@/components/Notification";
import Layout from "@/templates/Layout";
import Scroll from "@/components/Scroll";

export const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const listNotifications = useStore((state) => state.listNotifications);
  const post = useStore((state) => state.post);

  useEffect(() => {
    listNotifications();
  }, [listNotifications]);

  const onScrollLimit = useCallback(() => {
    listNotifications();
  }, [listNotifications]);

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
        {_.map(notifications, (item, key) => {
          return <Notification key={key} notification={item} />;
        })}
      </Scroll>
    </Layout>
  );
};

export default Notifications;
