import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import HistoryLayout from "@/templates/HistoryLayout";
import ProfileTemplate from "@/templates/ProfileTemplate";
import ProfileContainer from "@/containers/ProfileContainer";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(handle || "", false);
  }, [getAuthorFeed, handle]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HistoryLayout>
          <Suspense fallback={<ProfileTemplate />}>{handle && <ProfileContainer handle={handle} />}</Suspense>
        </HistoryLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default ProfilePage;
