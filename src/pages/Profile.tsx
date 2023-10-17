import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import HeaderLayout from "@/templates/HeaderLayout";
import ProfileTemplate from "@/templates/ProfileTemplate";
import ProfileContainer from "@/containers/ProfileContainer";

export const ProfilePage = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const { handle } = useParams<"handle">();
  const getAuthorFeed = useStore((state) => state.getAuthorFeed);

  const onScrollLimit = useCallback(() => {
    getAuthorFeed(handle || "", false);
  }, [getAuthorFeed, handle]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HeaderLayout menu={isPhone} history={!isPhone}>
          <Suspense fallback={<ProfileTemplate />}>{handle && <ProfileContainer handle={handle} />}</Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default ProfilePage;
