import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import Scroll from "@/components/Scroll";
import Profile from "@/components/Profile";
import SkeletonUI from "@/components/SkeletonUI";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();
  const authorFeed = useStore((state) => state.authorFeed);
  const actor = useStore((state) => state.actor);
  const me = useStore((state) => state.me);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);
  const follow = useStore((state) => state.follow);
  const unfollow = useStore((state) => state.unfollow);
  const block = useStore((state) => state.block);
  const unblock = useStore((state) => state.unblock);
  const mute = useStore((state) => state.mute);
  const unmute = useStore((state) => state.unmute);
  const post = useStore((state) => state.post);

  useEffect(() => {
    getProfile(handle || "");
    getAuthorFeed(handle || "");
  }, [getProfile, getAuthorFeed, handle]);

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(handle || "");
  }, [getAuthorFeed, handle]);

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

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
        {me && actor ? (
          <Profile
            actor={actor}
            me={me}
            onFollow={onFollow}
            onUnFollow={onUnFollow}
            onMute={onMute}
            onUnMute={onUnMute}
            onBlock={onBlock}
            onUnBlock={onUnBlock}
            onShare={onShare}
          />
        ) : (
          <SkeletonUI type="profile" />
        )}
        {_.map(authorFeed, (item, key) => {
          if (item.reply) {
            return <Post key={key} post={item.reply.root} />;
          }
          return <Post key={key} post={item.post} />;
        })}
      </Scroll>
    </Layout>
  );
};

export default ProfilePage;
