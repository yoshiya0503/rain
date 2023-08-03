import { useStore } from "@/stores";

export const useMe = () => {
  const me = useStore((state) => state.me);
  const getMe = useStore((state) => state.getMe);

  if (!me) {
    throw getMe();
  }

  return me;
};

export default useMe;
