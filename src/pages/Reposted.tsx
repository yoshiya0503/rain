import { Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/stores";
import Layout from "@/templates/Layout";
import ScrollLayout from "@/templates/ScrollLayout";
import HistoryLayout from "@/templates/HistoryLayout";
import RepostedContainer from "@/containers/RepostedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Reposted = () => {
  const { handle, id } = useParams();
  const uri = useStore((state) => state.uri);
  const getRepostedBy = useStore((state) => state.getRepostedBy);

  const onScrollLimit = useCallback(() => {
    getRepostedBy(uri, false);
  }, [getRepostedBy, uri]);

  return (
    <Layout>
      <ScrollLayout onScrollLimit={onScrollLimit}>
        <HistoryLayout>
          <Suspense fallback={<TimelineTemplate />}>
            <RepostedContainer handle={handle || ""} id={id || ""} />
          </Suspense>
        </HistoryLayout>
      </ScrollLayout>
    </Layout>
  );
};

export default Reposted;
