import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import RepostedContainer from "@/containers/RepostedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";
import HeaderMenu from "@/components/HeaderMenu";

export const Reposted = () => {
  const { handle, id } = useParams();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const uri = useStore((state) => state.uri);
  const getRepostedBy = useStore((state) => state.getRepostedBy);

  const onScrollLimit = useCallback(() => {
    getRepostedBy(uri, false);
  }, [getRepostedBy, uri]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        {!isPhone && <HeaderMenu history />}
        <Suspense fallback={<TimelineTemplate />}>
          <RepostedContainer handle={handle || ""} id={id || ""} />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default Reposted;
