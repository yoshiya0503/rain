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

export const LikedContainer = (props: Props) => {
  const uri = useStore((state) => state.uri);
  const seenURI = useStore((state) => state.seenLikedURI);
  const likedBy = useStore((state) => state.likedBy);
  const getLikedBy = useStore((state) => state.getLikedBy);
  const resolveHandle = useStore((state) => state.resolveHandle);

  if (!_.includes(seenURI, props.id)) {
    throw (async () => {
      const did = await resolveHandle(props.handle);
      await getLikedBy(`at://${did}/app.bsky.feed.post/${props.id}`, true);
    })();
  }

  const onScrollLimit = useCallback(() => {
    getLikedBy(uri, false);
  }, [getLikedBy, uri]);

  if (_.isEmpty(likedBy)) {
    return (
      <CenterLayout>
        <NotFound type="liked" />
      </CenterLayout>
    );
  }

  // TODO 元の位置へ戻る機能
  return (
    <ScrollLayout onScrollLimit={onScrollLimit}>
      {_.map(likedBy, (item, key) => (
        <Box key={key}>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Follow profile={item.actor} />
          </Box>
          <Divider />
        </Box>
      ))}
    </ScrollLayout>
  );
};

export default LikedContainer;
