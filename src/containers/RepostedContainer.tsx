import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CenterLayout from "@/templates/CenterLayout";
import NotFound from "@/components/NotFound";
import Follow from "@/components/Follow";
import ScrollLayout from "@/templates/ScrollLayout";

type Props = {
  handle: string;
  id: string;
};

export const RepostedContainer = (props: Props) => {
  const uri = useStore((state) => state.uri);
  const seenURI = useStore((state) => state.seenRepostedURI);
  const repostedBy = useStore((state) => state.repostedBy);
  const getRepostedBy = useStore((state) => state.getRepostedBy);
  const resolveHandle = useStore((state) => state.resolveHandle);

  if (!_.includes(seenURI, props.id)) {
    throw (async () => {
      const did = await resolveHandle(props.handle);
      await getRepostedBy(`at://${did}/app.bsky.feed.post/${props.id}`, true);
    })();
  }

  const onScrollLimit = useCallback(() => {
    getRepostedBy(uri, false);
  }, [getRepostedBy, uri]);

  if (_.isEmpty(repostedBy)) {
    return (
      <CenterLayout>
        <NotFound type="reposted" />
      </CenterLayout>
    );
  }

  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      {_.map(repostedBy, (item, key) => (
        <Box key={key}>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Follow profile={item} />
          </Box>
          <Divider />
        </Box>
      ))}
    </ScrollLayout>
  );
};

export default RepostedContainer;
