import { useState, useCallback } from "react";

export const useBackdrop = () => {
  const TIMEOUT = 10 * 1000;
  const [open, setOpen] = useState<boolean>(false);

  const openBackdrop = useCallback(() => {
    setOpen(true);
  }, []);

  const closeBackdrop = useCallback(() => {
    setOpen(false);
  }, []);

  const withBackdrop = useCallback(
    async (callback: () => Promise<void>) => {
      setOpen(true);
      const timeout = setTimeout(() => {
        setOpen(false);
      }, TIMEOUT);

      await callback();
      setOpen(false);
      clearTimeout(timeout);
    },
    [TIMEOUT, setOpen]
  );

  return { open, openBackdrop, closeBackdrop, withBackdrop } as const;
};

export default useBackdrop;
