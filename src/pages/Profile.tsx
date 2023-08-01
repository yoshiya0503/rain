import _ from "lodash";
import { useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import Layout from "@/templates/Layout";
import ScrollView from "@/templates/ScrollView";
import ProfileContainer from "@/templates/ProfileContainer";
import FeedContainer from "@/templates/FeedContainer";
import PostContainer from "@/templates/PostContainer";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
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
      <ScrollView onScrollLimit={onScrollLimit}>
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContainer>
            <Profile handle={handle || ""} />
          </ProfileContainer>
        </Suspense>
        {actor && actor.handle === handle && (
          <FeedContainer>
            <TransitionGroup>
              {_.map(authorFeed, (item) => (
                <Collapse key={item.post.cid}>
                  <PostContainer>
                    {item.reply?.root && <Post post={item.reply.root} reason={item.reason} hasReply />}
                    {item.reply?.parent && item.reply?.parent.cid !== item.reply?.root.cid && (
                      <Post post={item.reply.parent} reason={item.reason} hasReply />
                    )}
                    <Post post={item.post} reason={item.reason} />
                  </PostContainer>
                </Collapse>
              ))}
            </TransitionGroup>
          </FeedContainer>
        )}
      </ScrollView>
    </Layout>
  );
};

export default ProfilePage;
