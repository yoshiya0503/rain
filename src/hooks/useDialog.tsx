import { useState, useCallback } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>("");

  const openDialog = useCallback((id?: string) => {
    setOpen(true);
    setId(id);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setId(undefined);
  }, []);

  return [open, openDialog, closeDialog, id] as const;
};

export default useDialog;
