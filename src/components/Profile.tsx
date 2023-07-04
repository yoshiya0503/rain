import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import MuteIcon from "@mui/icons-material/VolumeOff";
import ReportIcon from "@mui/icons-material/Report";
import ShareIcon from "@mui/icons-material/Share";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Linkify from "linkify-react";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  action?: (action: string, actor: AppBskyActorDefs.ProfileViewDetailed) => void;
};

export const Profile = (props: Props) => {
  const actions = [
    { icon: <BlockIcon />, name: "Block" },
    { icon: <MuteIcon />, name: "Mute" },
    { icon: <ReportIcon />, name: "Report" },
    { icon: <ShareIcon />, name: "Share" },
    { icon: <AddIcon />, name: "Add To List" },
  ];
  return (
    <Card sx={{ m: 1, maxWidth: 480, maxHeight: 400 }}>
      <CardMedia sx={{ height: 140 }} image={props.actor?.banner} />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 64, height: 64 }} src={props.actor?.avatar} />
            <Box>
              <Typography variant="h5">{props.actor?.displayName}</Typography>
              <Typography variant="caption">@{props.actor?.handle}</Typography>
              {props.actor?.viewer?.followedBy && (
                <Chip sx={{ ml: 1 }} label="followed you" size="small" color="primary" variant="outlined" />
              )}
            </Box>
            <Box>
              {props.actor?.viewer?.following ? (
                <Chip label="following" size="small" color="primary" icon={<CheckIcon />} />
              ) : (
                <Chip label="follow" size="small" color="primary" icon={<AddIcon />} />
              )}
              {props.actor?.viewer?.muted && "ミュートしてる"}
              {props.actor?.viewer?.mutedByList && "ミュートされている"}
              {props.actor?.viewer?.blocking && "ブロックしている"}
              {props.actor?.viewer?.blockedBy && "ブロックされている"}
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ fontWeight: "bold" }}>{props.actor?.followersCount}</Typography>followers
            <Typography sx={{ fontWeight: "bold" }}>{props.actor?.followsCount}</Typography>following
            <Typography sx={{ fontWeight: "bold" }}>{props.actor?.postsCount}</Typography>posts
          </Stack>
          <Typography variant="body2">
            <Linkify>{props.actor?.description}</Linkify>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Profile;
