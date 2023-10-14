import { useEffect } from "react";
import { useStore } from "@/stores";
import useNotification from "@/hooks/useNotification";

export const useRealtime = () => {
  const INTERVAL = 30 * 1000;
  const reloadTimeline = useStore((state) => state.reloadTimeline);
  const unreadTimeline = useStore((state) => state.unreadTimeline);
  const { unreadCount, countUnreadNotifications } = useNotification();

  useEffect(() => {
    const interval = setInterval(async () => {
      countUnreadNotifications();
      reloadTimeline();
    }, INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [countUnreadNotifications, reloadTimeline, INTERVAL]);

  return { unreadCount, unreadTimeline } as const;
};

export default useRealtime;
