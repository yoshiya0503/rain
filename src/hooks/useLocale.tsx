import _ from "lodash";
import { useCallback } from "react";
import { formatDistanceToNowStrict, format } from "date-fns";
import { ja } from "date-fns/locale";

export const useLocale = () => {
  const fromNow = useCallback((indexedAt: string) => {
    if (_.includes(navigator.languages, "ja")) {
      return formatDistanceToNowStrict(Date.parse(indexedAt), { locale: ja });
    }
    return formatDistanceToNowStrict(Date.parse(indexedAt));
  }, []);

  const locale = useCallback((indexedAt: string) => {
    if (_.includes(navigator.languages, "ja")) {
      return format(new Date(indexedAt), "yyyy年MM月dd日", { locale: ja });
    }
    return format(new Date(indexedAt), "yyyy-MM-dd");
  }, []);

  return { fromNow, locale };
};

export default useLocale;
