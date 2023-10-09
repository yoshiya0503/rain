import _ from "lodash";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const SettingTemplate = () => {
  return (
    <Stack>
      <Stack direction="row" spacing={2}>
        <Skeleton variant="circular" width={64} height={64} />
        <Stack sx={{ width: "60%" }}>
          <Skeleton width="50%" height={30} />
          <Skeleton width="50%" height={30} />
        </Stack>
      </Stack>
      {_.times(5, (item) => (
        <Stack key={item} sx={{ width: "100%" }}>
          <Skeleton width="50%" height={30} />
          <Skeleton width="100%" height={80} />
        </Stack>
      ))}
    </Stack>
  );
};

export default SettingTemplate;
