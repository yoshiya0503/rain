import { useStore } from "@/stores";

export const useActor = (handle: string) => {
  const actor = useStore((state) => state.actor);
  const getProfile = useStore((state) => state.getProfile);

  if (!actor) {
    throw getProfile(handle);
  }

  if (actor.handle !== handle) {
    throw getProfile(handle);
  }

  return actor;
};

export default useActor;
