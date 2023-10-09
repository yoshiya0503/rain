import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import { AppBskyActorDefs } from "@atproto/api";

export const useSocial = () => {
  const getProfile = useStore((state) => state.getProfile);
  const follow = useStore((state) => state.follow);
  const unfollow = useStore((state) => state.unfollow);
  const block = useStore((state) => state.block);
  const unblock = useStore((state) => state.unblock);
  const mute = useStore((state) => state.mute);
  const unmute = useStore((state) => state.unmute);
  const updateFollowViewer = useStore((state) => state.updateFollowViwer);
  const updateSuggestionViewer = useStore((state) => state.updateSuggestionViewer);
  // TODO フォロー画面の更新

  const onFollow = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await follow(actor.did);
      await getProfile(actor.handle);
      // updateFollowViewer(actor, "followers");
      updateSuggestionViewer(actor.did);
    },
    [follow, getProfile, updateFollowViewer, updateSuggestionViewer]
  );

  const onUnFollow = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await unfollow(actor.viewer?.following || "");
      await getProfile(actor.handle);
      // updateFollowViewer(actor, "follows");
    },
    [unfollow, getProfile, updateFollowViewer]
  );

  const onMute = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await mute(actor.did);
      await getProfile(actor.handle);
    },
    [mute, getProfile]
  );

  const onUnMute = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await unmute(actor.did);
      await getProfile(actor.handle);
    },
    [unmute, getProfile]
  );

  const onBlock = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await block(actor.did);
      _.delay(async () => {
        await getProfile(actor.handle || "");
      }, 500);
    },
    [block, getProfile]
  );

  const onUnBlock = useCallback(
    async (actor: AppBskyActorDefs.ProfileView) => {
      await unblock(actor.viewer?.blocking || "");
      _.delay(async () => {
        await getProfile(actor.handle);
      }, 500);
    },
    [unblock, getProfile]
  );

  const onShare = useCallback((actor: AppBskyActorDefs.ProfileView) => {
    const url = `https://bsky.app/profile/${actor.handle}`;
    navigator.clipboard.writeText(url);
  }, []);

  return { onFollow, onUnFollow, onMute, onUnMute, onBlock, onUnBlock, onShare };
};

export default useSocial;
