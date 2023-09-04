import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/CheckRounded";
import AddIcon from "@mui/icons-material/AddRounded";
import BlockIcon from "@mui/icons-material/BlockRounded";
import MuteIcon from "@mui/icons-material/VolumeOffRounded";
import ReportIcon from "@mui/icons-material/ReportRounded";
import ShareIcon from "@mui/icons-material/ShareRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DropDownMenu from "@/components/DropDownMenu";
import DialogProfile from "@/components/DialogProfile";
import DialogReport from "@/components/DialogReport";
import Text from "@/components/Text";
import useSocial from "@/hooks/useSocial";
import useDialog from "@/hooks/useDialog";
import useMe from "@/hooks/useMe";
import { AppBskyActorDefs } from "@atproto/api";

// TODO Add to list
type Props = {
  actor: AppBskyActorDefs.ProfileViewDetailed;
};

export const Profile = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const me = useMe();
  const [isOpenProfile, openProfileDialog, closeProfileDialog] = useDialog();
  const [isOpenReport, openReportDialog, closeReportDialog] = useDialog();
  const { onFollow, onUnFollow, onMute, onUnMute, onBlock, onUnBlock, onShare } = useSocial();

  const onToggleFollow = useCallback(() => {
    return props.actor.viewer?.following ? onUnFollow(props.actor) : onFollow(props.actor);
  }, [props.actor, onFollow, onUnFollow]);

  const onToggleMute = useCallback(() => {
    return props.actor.viewer?.muted ? onUnMute(props.actor) : onMute(props.actor);
  }, [props.actor, onMute, onUnMute]);

  const onToggleBlock = useCallback(() => {
    return props.actor.viewer?.blocking ? onUnBlock(props.actor) : onBlock(props.actor);
  }, [props.actor, onBlock, onUnBlock]);

  const onClickShare = useCallback(() => {
    return onShare(props.actor);
  }, [props.actor, onShare]);

  const onViewFollow = useCallback(() => {
    const uri = `/profile/${props.actor.handle}/follows`;
    navigate(uri);
  }, [props, navigate]);

  const isMe = me.did === props.actor.did;
  const muteLabel = props.actor?.viewer?.muted ? "Unmute" : "Mute";
  const blockLabel = props.actor.viewer?.blocking ? "Unblock" : "Block";
  const menuItems = isMe
    ? [{ name: "share", icon: <ShareIcon />, label: "Share", action: onClickShare }]
    : [
        { name: "share", icon: <ShareIcon />, label: "Share", action: onClickShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: onClickShare },
        { name: "mute", icon: <MuteIcon />, label: muteLabel, action: onToggleMute },
        { name: "block", icon: <BlockIcon />, label: blockLabel, action: onToggleBlock },
        { name: "report", icon: <ReportIcon />, label: "Report", action: openReportDialog },
      ];

  return (
    <Card>
      {props.actor.banner ? (
        <CardMedia sx={{ height: 140 }} image={props.actor.banner} />
      ) : (
        <Box sx={{ height: 140, backgroundColor: theme.palette.primary.main }} />
      )}
      <CardContent>
        <Stack>
          <Stack sx={{ mt: -6 }} direction="row" justifyContent="space-between">
            <Avatar sx={{ width: 64, height: 64 }} src={props.actor.avatar} />
            <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
              {!isMe &&
                (props.actor?.viewer?.following ? (
                  <Button
                    sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                    startIcon={<CheckIcon />}
                    size="small"
                    variant="contained"
                    onClick={onToggleFollow}
                  >
                    following
                  </Button>
                ) : (
                  <Button
                    sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                    startIcon={<AddIcon />}
                    size="small"
                    variant="contained"
                    onClick={onToggleFollow}
                  >
                    follow
                  </Button>
                ))}
              {isMe && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<EditIcon />}
                  size="small"
                  variant="contained"
                  onClick={openProfileDialog}
                >
                  Edit Profile
                </Button>
              )}
              <DropDownMenu items={menuItems} />
            </Stack>
          </Stack>
          <Box>
            <Typography variant="h5">{props.actor.displayName}</Typography>
            <Typography variant="caption">@{props.actor.handle}</Typography>
            {props.actor.viewer?.followedBy && (
              <Chip sx={{ ml: 1 }} label="followed you" size="small" color="primary" variant="outlined" />
            )}
            {props.actor.viewer?.muted && (
              <Chip sx={{ ml: 1 }} label="mute" size="small" color="info" variant="outlined" icon={<MuteIcon />} />
            )}
            {props.actor.viewer?.mutedByList && (
              <Chip
                sx={{ ml: 1 }}
                label="muted by"
                size="small"
                color="warning"
                variant="outlined"
                icon={<MuteIcon />}
              />
            )}
            {props.actor.viewer?.blocking && (
              <Chip
                sx={{ ml: 1 }}
                label="blocking"
                size="small"
                color="warning"
                variant="outlined"
                icon={<BlockIcon />}
              />
            )}
            {props.actor.viewer?.blockedBy && (
              <Chip sx={{ ml: 1 }} label="blocked" size="small" color="error" variant="outlined" icon={<BlockIcon />} />
            )}
          </Box>
          <Stack direction="row" spacing={1} onClick={onViewFollow}>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor.followersCount}
              </Typography>
              <Typography variant="caption">followers</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor.followsCount}
              </Typography>
              <Typography variant="caption">following</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor.postsCount}
              </Typography>
              <Typography variant="caption">posts</Typography>
            </Stack>
          </Stack>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} variant="caption">
            <Text>{props.actor.description}</Text>
          </Typography>
        </Stack>
      </CardContent>
      <DialogProfile open={isOpenProfile} onClose={closeProfileDialog} />
      <DialogReport actor={props.actor} open={isOpenReport} onClose={closeReportDialog} />
    </Card>
  );
};

export default Profile;
