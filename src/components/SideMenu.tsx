import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import Feed from "@mui/icons-material/Feed";
import Notifications from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import ProfileInline from "@/components/ProfileInline";
import PostButton from "@/components/PostButton";
import useMe from "@/hooks/useMe";

export const SideMenu = () => {
  const me = useMe();
  const navigate = useNavigate();

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
      <ProfileInline profile={me} />
      <MenuList>
        {_.map(menus, (menu, key) => (
          <MenuItem key={key} onClick={onClickMenu(menu.href)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
      <PostButton label="New Post" />
    </Paper>
  );
};

export default SideMenu;
