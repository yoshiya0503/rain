import _ from "lodash";
import { useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import Scroll from "@/components/Scroll";
import Profile from "@/components/Profile";
import ProfileSkeleton from "@/templates/ProfileSkeleton";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();
  const authorFeed = useStore((state) => state.authorFeed);
  const actor = useStore((state) => state.actor);
  const getProfile = useStore((state) => state.getProfile);
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);

  useEffect(() => {
    getProfile(handle || "");
    getAuthorFeed(handle || "", true);
  }, [getProfile, getAuthorFeed, handle]);

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(handle || "", false);
  }, [getAuthorFeed, handle]);

  return (
    <Layout>
      <Scroll onScrollLimit={onScrollLimit}>
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile handle={handle || ""} />
        </Suspense>
        {actor &&
          actor.handle === handle &&
          _.map(authorFeed, (item, key) => {
            return <Post key={key} post={item.post} />;
          })}
      </Scroll>
    </Layout>
  );
};

export default ProfilePage;
