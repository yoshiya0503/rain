import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import LikedContainer from "@/containers/LikedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";
import HeaderMenu from "@/components/HeaderMenu";

export const Liked = () => {
  const { handle, id } = useParams();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const uri = useStore((state) => state.uri);
  const getLikedBy = useStore((state) => state.getLikedBy);

  const onScrollLimit = useCallback(() => {
    getLikedBy(uri, false);
  }, [getLikedBy, uri]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        {!isPhone && <HeaderMenu history />}
        <Suspense fallback={<TimelineTemplate />}>
          <LikedContainer handle={handle || ""} id={id || ""} />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default Liked;
