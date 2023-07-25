import { useState, useCallback } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return [open, openDialog, closeDialog] as const;
};

export default useDialog;
