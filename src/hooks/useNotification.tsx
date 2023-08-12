import { useStore } from "@/stores";

export const useNotifications = () => {
  const unreadCount = useStore((state) => state.unreadCount);
  const countUnreadNotifications = useStore((state) => state.countUnreadNotifications);

  if (unreadCount === null) {
    throw countUnreadNotifications();
  }
  return { unreadCount };
};

export default useNotifications;
