import _ from "lodash";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProfileHeader from "@/components/ProfileHeader";
import CheckIcon from "@mui/icons-material/CheckRounded";
import AddIcon from "@mui/icons-material/AddRounded";
import MuteIcon from "@mui/icons-material/VolumeOffRounded";
import useSocial from "@/hooks/useSocial";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile: AppBskyActorDefs.ProfileView;
};

export const Follow = (props: Props) => {
  const { onFollow, onUnFollow } = useSocial();

  const onToggleFollow = useCallback(() => {
    return props.profile.viewer?.following ? onUnFollow(props.profile) : onFollow(props.profile);
  }, [props.profile, onFollow, onUnFollow]);

  const bio = _.chain(props.profile.description).split("\n").take(2).join(" ").value();

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ProfileHeader profile={props.profile} />
        {props.profile?.viewer?.following ? (
          <Button
            sx={{ borderRadius: 6 }}
            startIcon={<CheckIcon />}
            size="small"
            variant="outlined"
            onClick={onToggleFollow}
          >
            unfollow
          </Button>
        ) : (
          <Button
            sx={{ borderRadius: 6 }}
            startIcon={<AddIcon />}
            size="small"
            variant="contained"
            onClick={onToggleFollow}
          >
            follow
          </Button>
        )}
      </Stack>
      <Box>
        {props.profile?.viewer?.following && <Chip label="following" size="small" color="primary" variant="outlined" />}
        {props.profile?.viewer?.muted && (
          <Chip sx={{ ml: 1 }} label="mute" size="small" color="info" variant="outlined" icon={<MuteIcon />} />
        )}
      </Box>
      <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
        {_.truncate(bio, { length: 100 })}
      </Typography>
    </Stack>
  );
};

export default Follow;
