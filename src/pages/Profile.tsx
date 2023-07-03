import { useEffect, useCallback } from "react";
import { useStore } from "@/stores";

export const Profile = () => {
  const actor = useStore((state) => state.actor);
  const session = useStore((state) => state.session);

  return <div>profile</div>;
};

export default Profile;
