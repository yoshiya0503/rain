import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/templates/Layout";
import RepostedContainer from "@/containers/RepostedContainer";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const Reposted = () => {
  const { handle, id } = useParams();

  return (
    <Layout>
      <Suspense fallback={<TimelineTemplate />}>
        <RepostedContainer handle={handle || ""} id={id || ""} />
      </Suspense>
    </Layout>
  );
};

export default Reposted;
