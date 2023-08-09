import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import Linkify from "linkify-react";
import DropDownMenu from "@/components/DropDownMenu";
import useSocial from "@/hooks/useSocial";
import useMe from "@/hooks/useMe";
import useActor from "@/hooks/useActor";

//TODO Add to list
//TODO moderation report
type Props = {
  handle: string;
};

export const Profile = (props: Props) => {
  const navigate = useNavigate();
  const me = useMe();
  const actor = useActor(props.handle);
  const { onFollow, onUnFollow, onMute, onUnMute, onBlock, onUnBlock, onShare } = useSocial();

  const onToggleFollow = useCallback(() => {
    return actor.viewer?.following ? onUnFollow(actor) : onFollow(actor);
  }, [actor, onFollow, onUnFollow]);

  const onToggleMute = useCallback(() => {
    return actor.viewer?.muted ? onUnMute(actor) : onMute(actor);
  }, [actor, onMute, onUnMute]);

  const onToggleBlock = useCallback(() => {
    return actor.viewer?.blocking ? onUnBlock(actor) : onBlock(actor);
  }, [actor, onBlock, onUnBlock]);

  const onClickShare = useCallback(() => {
    return onShare(actor);
  }, [actor, onShare]);

  const onViewFollow = useCallback(() => {
    const uri = `/profile/${props.handle}/follows`;
    navigate(uri);
  }, [props, navigate]);

  const isMe = me.did === actor.did;
  const menuItems = isMe
    ? [
        { name: "share", icon: <ShareIcon />, label: "Share", action: onClickShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: onClickShare },
      ]
    : [
        {
          name: "block",
          icon: <BlockIcon />,
          label: actor.viewer?.blocking ? "Unblock" : "Block",
          action: onToggleBlock,
        },
        {
          name: "mute",
          icon: <MuteIcon />,
          label: actor?.viewer?.muted ? "Unmute" : "Mute",
          action: onToggleMute,
        },
        { name: "report", icon: <ReportIcon />, label: "Report", action: onToggleMute },
        { name: "share", icon: <ShareIcon />, label: "Share", action: onClickShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: onClickShare },
      ];

  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={actor.banner} />
      <CardContent>
        <Stack>
          <Stack sx={{ mt: -6 }} direction="row" justifyContent="space-between">
            <Avatar sx={{ width: 64, height: 64 }} src={actor.avatar} />
            <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
              {actor?.viewer?.following && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<CheckIcon />}
                  size="small"
                  variant="contained"
                  onClick={onToggleFollow}
                >
                  following
                </Button>
              )}
              {!isMe && !actor?.viewer?.following && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<AddIcon />}
                  size="small"
                  variant="contained"
                  onClick={onToggleFollow}
                >
                  follow
                </Button>
              )}
              {isMe && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<EditIcon />}
                  size="small"
                  variant="contained"
                >
                  Edit Profile
                </Button>
              )}
              <DropDownMenu items={menuItems} />
            </Stack>
          </Stack>
          <Box>
            <Typography variant="h5">{actor.displayName}</Typography>
            <Typography variant="caption">@{actor.handle}</Typography>
            {actor.viewer?.followedBy && (
              <Chip sx={{ ml: 1 }} label="followed you" size="small" color="primary" variant="outlined" />
            )}
            {actor.viewer?.muted && (
              <Chip sx={{ ml: 1 }} label="mute" size="small" color="info" variant="outlined" icon={<MuteIcon />} />
            )}
            {actor.viewer?.mutedByList && (
              <Chip
                sx={{ ml: 1 }}
                label="muted by"
                size="small"
                color="warning"
                variant="outlined"
                icon={<MuteIcon />}
              />
            )}
            {actor.viewer?.blocking && (
              <Chip
                sx={{ ml: 1 }}
                label="blocking"
                size="small"
                color="warning"
                variant="outlined"
                icon={<BlockIcon />}
              />
            )}
            {actor.viewer?.blockedBy && (
              <Chip sx={{ ml: 1 }} label="blocked" size="small" color="error" variant="outlined" icon={<BlockIcon />} />
            )}
          </Box>
          <Stack direction="row" spacing={1} onClick={onViewFollow}>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {actor.followersCount}
              </Typography>
              <Typography variant="caption">followers</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {actor.followsCount}
              </Typography>
              <Typography variant="caption">following</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.3}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {actor.postsCount}
              </Typography>
              <Typography variant="caption">posts</Typography>
            </Stack>
          </Stack>
          <Typography variant="caption">
            <Linkify>{actor.description}</Linkify>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Profile;
