import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import TimelineTemplate from "@/templates/TimelineTemplate";

export const ProfileTemplate = () => {
  return (
    <>
      <Card sx={{ m: 1, maxWidth: 480, maxHeight: 400 }}>
        <Skeleton variant="rectangular" height={140} />
        <CardContent>
          <Stack>
            <Stack sx={{ mt: -6 }} direction="row" justifyContent="space-between">
              <Skeleton width={64} height={64} variant="circular" />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Skeleton width="50%" height={30} />
              <Skeleton width="30%" height={15} />
              <Skeleton width="30%" height={15} />
              <Skeleton width="100%" height={80} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <TimelineTemplate />
    </>
  );
};

export default ProfileTemplate;
