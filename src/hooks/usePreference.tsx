import _ from "lodash";
import { useStore } from "@/stores";

export const usePreference = () => {
  const preferences = useStore((state) => state.preferences);
  const savedFeeds = useStore((state) => state.savedFeeds);
  const pinnedFeeds = useStore((state) => state.pinnedFeeds);
  const getPreferences = useStore((state) => state.getPreferences);

  if (_.isEmpty(preferences)) {
    throw getPreferences();
  }

  return { savedFeeds, pinnedFeeds } as const;
};

export default usePreference;
