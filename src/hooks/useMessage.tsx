import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/stores";

export const useMessage = () => {
  const [open, setOpen] = useState(false);
  const removeMessage = useStore((state) => state.removeMessage);
  const message = useStore((state) => state.message);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const closeMessage = useCallback(() => {
    setOpen(false);
    removeMessage();
  }, [removeMessage]);

  return [open, message, closeMessage] as const;
};

export default useMessage;
