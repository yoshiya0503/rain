import { useCallback } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";

export const useLocale = () => {
  const locale = useCallback((indexedAt: string) => {
    return formatDistanceToNowStrict(Date.parse(indexedAt), { locale: ja });
  }, []);

  return { locale };
};

export default useLocale;
