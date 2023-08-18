import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import ProfileTemplate from "@/templates/ProfileTemplate";
import ProfileContainer from "@/containers/ProfileContainer";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();

  return (
    <Layout>
      <HistoryLayout>
        <Suspense fallback={<ProfileTemplate />}>{handle && <ProfileContainer handle={handle} />}</Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default ProfilePage;
