import _ from "lodash";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  type?: "profile" | "menu";
};

const MenuSkeleton = () => {
  return (
    <Paper sx={{ width: 240, height: 380, p: 2, borderRadius: 2 }}>
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

const ProfileSkeleton = () => {
  return (
    <Card sx={{ m: 1, maxWidth: 480, maxHeight: 400 }}>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Stack>
          <Stack sx={{ mt: -6 }} direction="row" justifyContent="space-between">
            <Skeleton width={64} height={64} variant="circular" />
          </Stack>
          <Box>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={10} />
            <Skeleton width={200} height={10} />
            <Skeleton width={400} height={100} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const SkeletonUI = (props: Props) => {
  if (props.type === "menu") {
    return <MenuSkeleton />;
  }
  if (props.type === "profile") {
    return <ProfileSkeleton />;
  }
  return null;
};

export default SkeletonUI;
