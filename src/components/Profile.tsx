import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ReportIcon from "@mui/icons-material/Report";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
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
  const me = useMe();
  const actor = useActor(props.handle);
  const { onFollow, onUnFollow, onMute, onUnMute, onBlock, onUnBlock, onShare } = useSocial(props.handle);

  const isMe = me.did === actor.did;
  const menuItems = isMe
    ? [
        { name: "share", icon: <ShareIcon />, label: "Share", action: onShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: onShare },
      ]
    : [
        {
          name: "block",
          icon: <BlockIcon />,
          label: actor.viewer?.blocking ? "Unblock" : "Block",
          action: actor.viewer?.blocking ? onUnBlock : onBlock,
        },
        {
          name: "mute",
          icon: <MuteIcon />,
          label: actor?.viewer?.muted ? "Unmute" : "Mute",
          action: actor?.viewer?.muted ? onUnMute : onMute,
        },
        { name: "report", icon: <ReportIcon />, label: "Report", action: onMute },
        { name: "share", icon: <ShareIcon />, label: "Share", action: onShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: onShare },
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
                  onClick={onUnFollow}
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
                  onClick={onFollow}
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
          <Stack direction="row" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {actor.followersCount}
              </Typography>
              <Typography variant="caption">followers</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {actor.followsCount}
              </Typography>
              <Typography variant="caption">following</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
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
