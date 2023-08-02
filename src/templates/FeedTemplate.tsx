import _ from "lodash";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const FeedTemplate = () => {
  return (
    <>
      {_.times(10, () => (
        <Stack sx={{ p: 1, maxWidth: 480, maxHeight: 120 }}>
          <Stack sx={{ p: 1, mt: 1, mb: 1 }} direction="row" spacing={1}>
            <Skeleton width={42} height={42} variant="circular" />
            <Stack sx={{ width: "100%" }}>
              <Skeleton width="50%" height={40} />
              <Skeleton width="80%" height={20} />
              <Skeleton width="80%" height={20} />
            </Stack>
          </Stack>
          <Skeleton height={1} />
        </Stack>
      ))}
    </>
  );
};

export default FeedTemplate;
