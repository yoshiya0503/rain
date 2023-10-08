import _ from "lodash";
import { useStore } from "@/stores";

export const usePreference = () => {
  const preferences = useStore((state) => state.preferences);
  const getPreferences = useStore((state) => state.getPreferences);
  const savedFeeds = useStore((state) => state.savedFeeds);

  if (_.isEmpty(preferences)) {
    throw getPreferences();
  }

  return { preferences, savedFeeds } as const;
};

export default usePreference;
