import { useState, useCallback } from "react";
import { useStore } from "@/stores";

export const useHandle = () => {
  const updateHandle = useStore((state) => state.updateHandle);
  const [handle, setHandle] = useState<string>("");

  const makeValidHandle = useCallback((str: string) => {
    if (str.length > 20) {
      str = str.slice(0, 20);
    }
    str = str.toLowerCase();
    return str.replace(/^[^a-z]+/g, "").replace(/[^a-z0-9-]/g, "");
  }, []);

  const onChangeHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const handle = makeValidHandle(e.currentTarget.value);
      setHandle(handle);
    },
    [setHandle, makeValidHandle]
  );

  const onUpdateHandle = useCallback(() => {
    updateHandle(`${handle}.bsky.social`);
  }, [handle, updateHandle]);

  return { handle, onChangeHandle, onUpdateHandle };
};

export default useHandle;
