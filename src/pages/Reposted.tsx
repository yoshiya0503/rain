import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import RepostedContainer from "@/containers/RepostedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Reposted = () => {
  const { handle, id } = useParams();

  return (
    <Layout>
      <HistoryLayout>
        <Suspense fallback={<TimelineTemplate />}>
          <RepostedContainer handle={handle || ""} id={id || ""} />
        </Suspense>
      </HistoryLayout>
    </Layout>
  );
};

export default Reposted;
