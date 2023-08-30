import _ from "lodash";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const MenuTemplate = () => {
  return (
    <Paper component="nav" sx={{ width: 240, height: 440, p: 2, borderRadius: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton width={64} height={64} variant="circular" />
        <Stack direction="column" spacing={1} sx={{ flexGrow: 1 }}>
          <Skeleton height={20} />
          <Skeleton height={20} />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 2 }} spacing={2} alignItems="center">
        {_.times(8, (index) => (
          <Skeleton key={index} width={150} height={25} />
        ))}
      </Stack>
    </Paper>
  );
};

export default MenuTemplate;
