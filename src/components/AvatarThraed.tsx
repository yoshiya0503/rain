import { useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile: AppBskyActorDefs.ProfileViewDetailed;
  hasReply?: boolean;
};

export const AvatarThread = (props: Props) => {
  const navigate = useNavigate();

  const onViewProfile = useCallback(() => {
    const uri = `/profile/${props.profile.handle}`;
    navigate(uri);
  }, [props, navigate]);

  return (
    <Box>
      <Stack sx={{ height: "100%" }} alignItems="center">
        <Avatar
          sx={{ width: 42, height: 42 }}
          alt={props.profile.displayName}
          src={props.profile.avatar}
          onClick={onViewProfile}
        />
        {props.hasReply && (
          <Box sx={{ flexGrow: 1, pb: 2 }}>
            <Divider orientation="vertical" variant="middle" sx={{ borderRightWidth: 2 }}></Divider>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AvatarThread;
