import _ from "lodash";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CenterLayout from "@/templates/CenterLayout";
import NotFound from "@/components/NotFound";
import Follow from "@/components/Follow";

type Props = {
  handle: string;
  id: string;
};

export const LikedContainer = (props: Props) => {
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

  if (_.isEmpty(likedBy)) {
    return (
      <CenterLayout>
        <NotFound type="liked" />
      </CenterLayout>
    );
  }

  return (
    <>
      {_.map(likedBy, (item, key) => (
        <Box key={key}>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Follow profile={item.actor} />
          </Box>
          <Divider />
        </Box>
      ))}
    </>
  );
};

export default LikedContainer;
