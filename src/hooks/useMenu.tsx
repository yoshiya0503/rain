import { useState, useCallback } from "react";

export const useMenu = () => {
  const [anchor, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return [anchor, openMenu, closeMenu] as const;
};

export default useMenu;
