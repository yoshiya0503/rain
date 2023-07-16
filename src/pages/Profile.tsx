import _ from "lodash";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import Scroll from "@/components/Scroll";
import Profile from "@/components/Profile";

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
    await getProfile(handle || "");
  }, [actor, handle, block, getProfile]);

  const onUnBlock = useCallback(async () => {
    await unblock(actor?.viewer?.blocking || "");
    await getProfile(handle || "");
  }, [actor, handle, unblock, getProfile]);

  return (
    <Layout onPost={post}>
      <Scroll onScrollLimit={onScrollLimit}>
        <Profile
          actor={actor}
          me={me}
          onFollow={onFollow}
          onUnFollow={onUnFollow}
          onMute={onMute}
          onUnMute={onUnMute}
          onBlock={onBlock}
          onUnBlock={onUnBlock}
        />
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
