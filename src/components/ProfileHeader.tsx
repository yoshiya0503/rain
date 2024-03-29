import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile: AppBskyActorDefs.ProfileViewDetailed;
  size?: "small" | "medium" | "large";
  disableAvatar?: boolean;
};

export const ProfileHeader = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  let sx = { width: 42, height: 42 };
  if (props.size === "small") {
    sx = { width: 32, height: 32 };
  }
  if (props.size === "medium") {
    sx = { width: 42, height: 42 };
  }
  if (props.size === "large") {
    sx = { width: 64, height: 64 };
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={(e) => {
        e.stopPropagation();
        const uri = `/profile/${props.profile.handle}`;
        if (location.pathname !== uri) {
          navigate(uri);
        }
      }}
    >
      {!props.disableAvatar && <Avatar alt={props.profile.displayName} src={props.profile.avatar} sx={sx} />}
      <Stack direction="column">
        {props.size === "small" ? (
          <Typography variant="caption">{props.profile.displayName}</Typography>
        ) : (
          <Typography variant="body2">{props.profile.displayName}</Typography>
        )}
        <Typography color={grey[500]} variant="caption">
          @{props.profile.handle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileHeader;
