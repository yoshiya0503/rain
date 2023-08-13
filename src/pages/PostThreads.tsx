import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import PostThreadsContainer from "@/containers/PostThreadsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const PostThreads = () => {
  const { handle, uri } = useParams<"handle", "uri">();

  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <PostThreadsContainer />
      </Suspense>
    </Layout>
  );
};

export default PostThreads;
