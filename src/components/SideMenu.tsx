import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
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
    <Paper sx={{ width: 240, height: 380, p: 2, borderRadius: 2 }}>
      <ProfileInline profile={me} size="large" />
      <MenuList>
        {_.map(menus, (menu, key) => (
          <MenuItem key={key} onClick={onClickMenu(menu.href)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
      <Button
        sx={{ mt: 1, width: "100%", borderRadius: 6 }}
        variant="contained"
        startIcon={<Create />}
        onClick={openPostDialog}
      >
        New Post
      </Button>
      <PostDialog title="Post" open={isOpen} onClose={closePostDialog} />
    </Paper>
  );
};

export default SideMenu;
