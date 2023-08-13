import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import PostThreadsContainer from "@/containers/PostThreadsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const PostThreads = () => {
  const { handle, id } = useParams();

  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <PostThreadsContainer handle={handle || ""} id={id || ""} />
      </Suspense>
    </Layout>
  );
};

export default PostThreads;
