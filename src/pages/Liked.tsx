import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import LikedContainer from "@/containers/LikedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Liked = () => {
  const { handle, id } = useParams();

  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <LikedContainer handle={handle || ""} id={id || ""} />
      </Suspense>
    </Layout>
  );
};

export default Liked;
