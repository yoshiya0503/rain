import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import PostThreadsContainer from "@/containers/PostThreadsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";
import HeaderMenu from "@/components/HeaderMenu";

export const PostThreads = () => {
  const { handle, id } = useParams();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <ScrollLayout>
        {!isPhone && <HeaderMenu history />}
        <Suspense fallback={<TimelineTemplate />}>
          <PostThreadsContainer handle={handle || ""} id={id || ""} />
        </Suspense>
      </ScrollLayout>
    </Layout>
  );
};

export default PostThreads;
