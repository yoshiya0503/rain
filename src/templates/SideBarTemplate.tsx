import _ from "lodash";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const MenuTemplate = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rounded" height={40} />
      <Paper component="nav" sx={{ width: 360, height: 300, p: 2, borderRadius: 3 }}>
        <Stack spacing={3}>
          {_.times(4, (key) => (
            <Stack key={key} direction="row" alignItems="center" spacing={2}>
              <Skeleton width={48} height={48} variant="rounded" />
              <Stack direction="column" spacing={1} sx={{ flexGrow: 1 }}>
                <Skeleton height={20} />
                <Skeleton height={20} />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
      <Paper component="nav" sx={{ width: 360, height: 300, p: 2, borderRadius: 3 }}>
        <Stack spacing={3}>
          {_.times(3, (key) => (
            <Stack key={key} direction="row" alignItems="center" spacing={2}>
              <Skeleton width={64} height={64} variant="circular" />
              <Stack direction="column" spacing={1} sx={{ flexGrow: 1 }}>
                <Skeleton height={20} />
                <Skeleton height={20} />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default MenuTemplate;
