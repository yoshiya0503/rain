import _ from "lodash";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const MenuTemplate = () => {
  return (
    <Paper sx={{ width: 240, height: 380, p: 2, borderRadius: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton width={64} height={64} variant="circular" />
        <Stack direction="column" spacing={1}>
          <Skeleton width={100} height={10} />
          <Skeleton width={100} height={10} />
        </Stack>
      </Stack>
      <Stack sx={{ mt: 2 }} spacing={1} alignItems="center">
        {_.times(6, (index) => (
          <Skeleton key={index} width={150} height={25} />
        ))}
      </Stack>
    </Paper>
  );
};

export default MenuTemplate;
