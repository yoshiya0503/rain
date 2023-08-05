import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Home from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/SearchRounded";
import Feed from "@mui/icons-material/FeedRounded";
import Notifications from "@mui/icons-material/NotificationsRounded";
import AccountCircle from "@mui/icons-material/AccountCircleRounded";
import Settings from "@mui/icons-material/SettingsRounded";
import Create from "@mui/icons-material/CreateRounded";
import ProfileInline from "@/components/ProfileInline";
import PostDialog from "@/components/PostDialog";
import useMe from "@/hooks/useMe";
import useDialog from "@/hooks/useDialog";

export const SideMenu = () => {
  const me = useMe();
  const navigate = useNavigate();
  const [isOpen, openPostDialog, closePostDialog] = useDialog();

  const menus = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "Search", icon: <Search />, href: "/search" },
    { name: "Feeds", icon: <Feed />, href: "/feeds" },
    { name: "Notifications", icon: <Notifications />, href: "/notifications" },
    { name: "Profile", icon: <AccountCircle />, href: `/profile/${me.handle}` },
    { name: "Settings", icon: <Settings />, href: "/settings" },
  ];

  const onClickMenu = (href: string) => () => {
    navigate(href);
  };

  return (
    <List>
      <ListItem>
        <ProfileInline profile={me} size="large" />
      </ListItem>
      {_.map(menus, (menu, key) => (
        <ListItem key={key} onClick={onClickMenu(menu.href)} disablePadding>
          <ListItemButton sx={{ borderRadius: 6 }}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem>
        <Button
          sx={{ width: "100%", borderRadius: 6 }}
          variant="contained"
          startIcon={<Create />}
          onClick={openPostDialog}
        >
          New Post
        </Button>
        <PostDialog title="Post" open={isOpen} onClose={closePostDialog} />
      </ListItem>
    </List>
  );
};

export default SideMenu;
