import { Suspense, useCallback } from "react";
import { useStore } from "@/stores";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import HeaderLayout from "@/templates/HeaderLayout";
import LikedContainer from "@/containers/LikedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Liked = () => {
  const { handle, id } = useParams();
  const uri = useStore((state) => state.uri);
  const getLikedBy = useStore((state) => state.getLikedBy);

  const onScrollLimit = useCallback(() => {
    getLikedBy(uri, false);
  }, [getLikedBy, uri]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HeaderLayout history>
          <Suspense fallback={<TimelineTemplate />}>
            <LikedContainer handle={handle || ""} id={id || ""} />
          </Suspense>
        </HeaderLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Liked;
