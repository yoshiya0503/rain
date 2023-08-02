import { useParams } from "react-router-dom";
import { Suspense } from "react";
import Layout from "@/templates/Layout";
import ProfileTemplate from "@/templates/ProfileTemplate";
import ProfileContainer from "@/containers/ProfileContainer";

export const ProfilePage = () => {
  const { handle } = useParams<"handle">();

  return (
    <Layout>
      <Suspense fallback={<ProfileTemplate />}>{handle && <ProfileContainer handle={handle} />}</Suspense>
    </Layout>
  );
};

export default ProfilePage;
