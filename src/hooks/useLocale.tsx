import _ from "lodash";
import { useCallback } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";

export const useLocale = () => {
  const locale = useCallback((indexedAt: string) => {
    if (_.includes(navigator.languages, "ja")) {
      return formatDistanceToNowStrict(Date.parse(indexedAt), { locale: ja });
    }
    return formatDistanceToNowStrict(Date.parse(indexedAt));
  }, []);

  return { locale };
};

export default useLocale;
