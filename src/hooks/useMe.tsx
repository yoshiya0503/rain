import { useStore } from "@/stores";

export const useMe = () => {
  const me = useStore((state) => state.me);
  const getMe = useStore((state) => state.getMe);

  if (!me) {
    // TODO
    console.log("呼ばれすぎ");
    throw getMe();
  }

  return me;
};

export default useMe;
