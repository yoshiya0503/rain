import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";

export const useSocial = (handle: string) => {
  const actor = useStore((state) => state.actor);
  const getProfile = useStore((state) => state.getProfile);
  const follow = useStore((state) => state.follow);
  const unfollow = useStore((state) => state.unfollow);
  const block = useStore((state) => state.block);
  const unblock = useStore((state) => state.unblock);
  const mute = useStore((state) => state.mute);
  const unmute = useStore((state) => state.unmute);

  if (!actor) {
    throw getProfile(handle);
  }

  const onFollow = useCallback(async () => {
    await follow(actor?.did || "");
    await getProfile(handle || "");
  }, [actor, handle, follow, getProfile]);

  const onUnFollow = useCallback(async () => {
    await unfollow(actor?.viewer?.following || "");
    await getProfile(handle || "");
  }, [actor, handle, unfollow, getProfile]);

  const onMute = useCallback(async () => {
    await mute(actor?.did || "");
    await getProfile(handle || "");
  }, [actor, handle, mute, getProfile]);

  const onUnMute = useCallback(async () => {
    await unmute(actor?.did || "");
    await getProfile(handle || "");
  }, [actor, handle, unmute, getProfile]);

  const onBlock = useCallback(async () => {
    await block(actor?.did || "");
    _.delay(async () => {
      await getProfile(handle || "");
    }, 500);
  }, [actor, handle, block, getProfile]);

  const onUnBlock = useCallback(async () => {
    await unblock(actor?.viewer?.blocking || "");
    _.delay(async () => {
      await getProfile(handle || "");
    }, 500);
  }, [actor, handle, unblock, getProfile]);

  const onShare = useCallback(() => {
    const url = `https://bsky.app/profile/${actor?.handle}`;
    navigator.clipboard.writeText(url);
  }, [actor]);

  return { onFollow, onUnFollow, onMute, onUnMute, onBlock, onUnBlock, onShare };
};

export default useSocial;
