import { useState, useCallback } from "react";

export const useDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return [open, openDrawer, closeDrawer] as const;
};

export default useDrawer;
