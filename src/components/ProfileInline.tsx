import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile?: AppBskyActorDefs.ProfileViewDetailed;
};

export const ProfileInline = (props: Props) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar alt={props.profile?.displayName} src={props.profile?.avatar} sx={{ width: 64, height: 64 }} />
      <Stack direction="column">
        <Typography variant="body2">{props.profile?.displayName}</Typography>
        <Typography variant="caption">@{props.profile?.handle}</Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileInline;
