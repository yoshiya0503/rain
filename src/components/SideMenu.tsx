import _ from "lodash";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import Feed from "@mui/icons-material/Feed";
import Notifications from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Create from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  profile?: AppBskyActorDefs.ProfileViewDetailed;
  onClickNewPost: () => void;
};

export const SideMenu = (props: Props) => {
  const navigate = useNavigate();

  const menus = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "Search", icon: <Search />, href: "/search" },
    { name: "Feeds", icon: <Feed />, href: "/feeds" },
    { name: "Notifications", icon: <Notifications />, href: "/notifications" },
    { name: "Profile", icon: <AccountCircle />, href: `/profile/${props.profile?.handle}` },
    { name: "Settings", icon: <Settings />, href: "/settings" },
  ];

  const onClickMenu = (href: string) => () => {
    navigate(href);
  };

  return (
    <Paper sx={{ width: 240, height: 380, maxWidth: "100%", p: 2, borderRadius: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        {props.profile ? (
          <Avatar alt={props.profile.displayName} src={props.profile.avatar} sx={{ width: 64, height: 64 }} />
        ) : (
          <Skeleton width={64} height={64} variant="circular" />
        )}
        <Stack direction="column" spacing={1}>
          {props.profile ? (
            <Typography variant="body2">{props.profile?.displayName}</Typography>
          ) : (
            <Skeleton width={100} height={10} />
          )}
          {props.profile ? (
            <Typography variant="body2">{props.profile?.handle}</Typography>
          ) : (
            <Skeleton width={100} height={10} />
          )}
        </Stack>
      </Stack>
      <MenuList>
        {_.map(menus, (menu, key) => (
          <MenuItem key={key} href={menu.href} onClick={onClickMenu(menu.href)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <Button
          sx={{ width: "100%", borderRadius: 6 }}
          variant="contained"
          startIcon={<Create />}
          onClick={props.onClickNewPost}
        >
          New Post
        </Button>
      </MenuList>
    </Paper>
  );
};

export default SideMenu;
