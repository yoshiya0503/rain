import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const ProfileTemplate = () => {
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

export default ProfileTemplate;
