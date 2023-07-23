import _ from "lodash";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
import MoreIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import Linkify from "linkify-react";
import { AppBskyActorDefs } from "@atproto/api";
import useMenu from "@/hooks/useMenu";

//TODO Add to list
//TODO moderation report

type Props = {
  me?: AppBskyActorDefs.ProfileViewDetailed;
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  action?: (action: string, actor: AppBskyActorDefs.ProfileViewDetailed) => void;
  onFollow?: () => void;
  onUnFollow?: () => void;
  onMute?: () => void;
  onUnMute?: () => void;
  onBlock?: () => void;
  onUnBlock?: () => void;
  onShare?: () => void;
};

export const Profile = (props: Props) => {
  const [anchor, openMenu, closeMenu] = useMenu();
  const isMe = props.me?.did === props.actor?.did;
  const actions = isMe
    ? [
        { name: "share", icon: <ShareIcon />, label: "Share", action: props.onShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: props.onShare },
      ]
    : [
        {
          name: "block",
          icon: <BlockIcon />,
          label: props.actor?.viewer?.blocking ? "Unblock" : "Block",
          action: props.actor?.viewer?.blocking ? props.onUnBlock : props.onBlock,
        },
        {
          name: "mute",
          icon: <MuteIcon />,
          label: props.actor?.viewer?.muted ? "Unmute" : "Mute",
          action: props.actor?.viewer?.muted ? props.onUnMute : props.onMute,
        },
        { name: "report", icon: <ReportIcon />, label: "Report", action: props.onMute },
        { name: "share", icon: <ShareIcon />, label: "Share", action: props.onShare },
        { name: "add_to_list", icon: <AddIcon />, label: "Add To List", action: props.onShare },
      ];

  return (
    <Card sx={{ m: 1, maxWidth: 480, maxHeight: 400 }}>
      <CardMedia sx={{ height: 140 }} image={props.actor?.banner} />
      <CardContent>
        <Stack>
          <Stack sx={{ mt: -6 }} direction="row" justifyContent="space-between">
            <Avatar sx={{ width: 64, height: 64 }} src={props.actor?.avatar} />
            <Stack sx={{ mt: 4 }} direction="row" alignItems="center">
              {props.actor?.viewer?.following && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<CheckIcon />}
                  size="small"
                  variant="contained"
                  onClick={props.onUnFollow}
                >
                  following
                </Button>
              )}
              {props.actor && !isMe && !props.actor?.viewer?.following && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<AddIcon />}
                  size="small"
                  variant="contained"
                  onClick={props.onFollow}
                >
                  follow
                </Button>
              )}
              {props.actor && isMe && (
                <Button
                  sx={{ width: "100%", borderRadius: 6, fontSize: 10 }}
                  startIcon={<EditIcon />}
                  size="small"
                  variant="contained"
                >
                  Edit Profile
                </Button>
              )}
              {props.actor && (
                <IconButton onClick={openMenu} size="small">
                  <MoreIcon />
                </IconButton>
              )}
              <Menu onClose={closeMenu} anchorEl={anchor} open={Boolean(anchor)}>
                {_.map(actions, (action, key) => (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      if (action.action) {
                        action.action();
                      }
                      closeMenu();
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {action.icon}
                      <Typography variant="body2">{action.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Stack>
          <Box>
            <Typography variant="h5">{props.actor?.displayName}</Typography>
            <Typography variant="caption">@{props.actor?.handle}</Typography>
            {props.actor?.viewer?.followedBy && (
              <Chip sx={{ ml: 1 }} label="followed you" size="small" color="primary" variant="outlined" />
            )}
            {props.actor?.viewer?.muted && (
              <Chip sx={{ ml: 1 }} label="mute" size="small" color="info" variant="outlined" icon={<MuteIcon />} />
            )}
            {props.actor?.viewer?.mutedByList && (
              <Chip
                sx={{ ml: 1 }}
                label="muted by"
                size="small"
                color="warning"
                variant="outlined"
                icon={<MuteIcon />}
              />
            )}
            {props.actor?.viewer?.blocking && (
              <Chip
                sx={{ ml: 1 }}
                label="blocking"
                size="small"
                color="warning"
                variant="outlined"
                icon={<BlockIcon />}
              />
            )}
            {props.actor?.viewer?.blockedBy && (
              <Chip sx={{ ml: 1 }} label="blocked" size="small" color="error" variant="outlined" icon={<BlockIcon />} />
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor?.followersCount}
              </Typography>
              <Typography variant="caption">followers</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor?.followsCount}
              </Typography>
              <Typography variant="caption">following</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="caption">
                {props.actor?.postsCount}
              </Typography>
              <Typography variant="caption">posts</Typography>
            </Stack>
          </Stack>
          <Typography variant="caption">
            <Linkify>{props.actor?.description}</Linkify>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Profile;
