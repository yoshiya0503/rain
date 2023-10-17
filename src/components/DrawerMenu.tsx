import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Drawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge";
import Home from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/SearchRounded";
import Tag from "@mui/icons-material/TagRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Notifications from "@mui/icons-material/NotificationsRounded";
import AccountCircle from "@mui/icons-material/AccountCircleRounded";
import Settings from "@mui/icons-material/SettingsRounded";
import ProfileHeader from "@/components/ProfileHeader";
import useMe from "@/hooks/useMe";
import useRealtime from "@/hooks/useRealtime";
import useDrawer from "@/hooks/useDrawer";

export const DrawerMenu = () => {
  const me = useMe();
  const { unreadCount, unreadTimeline } = useRealtime();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, onOpenDrawer, onCloseDrawer] = useDrawer();

  const menus = [
    {
      name: "Home",
      icon: (
        <Badge color="primary" variant="dot" invisible={!_.size(unreadTimeline)}>
          <Home />
        </Badge>
      ),
      href: "/",
    },
    { name: "Search", icon: <Search />, href: "/search" },
    { name: "Feeds", icon: <Tag />, href: "/feeds" },
    {
      name: "Notifications",
      icon: (
        <Badge badgeContent={unreadCount} color="primary">
          <Notifications />
        </Badge>
      ),
      href: "/notifications",
    },
    { name: "Profile", icon: <AccountCircle />, href: `/profile/${me.handle}` },
    { name: "Settings", icon: <Settings />, href: "/settings" },
  ];

  const onClickMenu = (href: string) => () => {
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  return (
    <>
      <IconButton onClick={onOpenDrawer}>
        <MenuRoundedIcon sx={{ width: 32, height: 32, color: grey[400] }} />
      </IconButton>
      <Drawer
        sx={{ zIndex: 1300 }}
        component="nav"
        anchor="left"
        open={open}
        onOpen={onOpenDrawer}
        onClose={onCloseDrawer}
      >
        <List>
          <ListItem>
            <ProfileHeader profile={me} size="large" />
          </ListItem>
          {_.map(menus, (menu, key) => (
            <ListItem key={key} onClick={onClickMenu(menu.href)}>
              <ListItemButton sx={{ borderRadius: 6 }}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
