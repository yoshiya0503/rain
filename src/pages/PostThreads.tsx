import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import HeaderLayout from "@/templates/HeaderLayout";
import ScrollLayout from "@/templates/ScrollLayout";
import PostThreadsContainer from "@/containers/PostThreadsContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const PostThreads = () => {
  const { handle, id } = useParams();

  return (
    <Layout>
      <ScrollLayout>
        <HeaderLayout history>
          <Suspense fallback={<TimelineTemplate />}>
            <PostThreadsContainer handle={handle || ""} id={id || ""} />
          </Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default PostThreads;
