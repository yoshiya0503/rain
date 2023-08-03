import _ from "lodash";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const FeedTemplate = () => {
  return (
    <>
      {_.times(10, (index) => (
        <Stack key={index} sx={{ maxWidth: 480, maxHeight: 120 }}>
          <Stack sx={{ pt: 1, pb: 1 }} direction="row" spacing={1}>
            <Stack>
              <Skeleton width={42} height={42} variant="circular" />
            </Stack>
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
