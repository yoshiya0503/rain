import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Badge from "@mui/material/Badge";
import Home from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/SearchRounded";
import Tag from "@mui/icons-material/TagRounded";
import Notifications from "@mui/icons-material/NotificationsRounded";
import Create from "@mui/icons-material/CreateRounded";
import DialogPost from "@/components/DialogPost";
import useMe from "@/hooks/useMe";
import useRealtime from "@/hooks/useRealtime";
import useDialog from "@/hooks/useDialog";

export const BottomMenu = () => {
  const me = useMe();
  const { unreadCount, unreadTimeline } = useRealtime();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, openPostDialog, closePostDialog] = useDialog();

  const menus = [
    {
      name: "Home",
      icon: (
        <Badge color="primary" variant="dot" invisible={!_.size(unreadTimeline)}>
          <Home sx={{ width: 32, height: 32 }} />
        </Badge>
      ),
      href: "/",
    },
    { name: "Search", icon: <Search sx={{ width: 32, height: 32 }} />, href: "/search" },
    { name: "Feeds", icon: <Tag sx={{ width: 32, height: 32 }} />, href: "/feeds" },
    {
      name: "Notifications",
      icon: (
        <Badge badgeContent={unreadCount} color="primary">
          <Notifications sx={{ width: 32, height: 32 }} />
        </Badge>
      ),
      href: "/notifications",
    },
    { name: "Profile", icon: <Avatar sx={{ width: 32, height: 32 }} src={me.avatar} />, href: `/profile/${me.handle}` },
  ];

  const onClickMenu = (href: string) => {
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  return (
    <>
      <Fab
        sx={{ position: "fixed", bottom: 90, right: 32, width: 64, height: 64 }}
        color="primary"
        onClick={openPostDialog}
      >
        <Create />
      </Fab>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={8}>
        <BottomNavigation
          sx={{ pb: 2, height: "8vh" }}
          value={location.pathname}
          onChange={(_, href) => {
            onClickMenu(href);
          }}
        >
          {_.map(menus, (menu, key) => (
            <BottomNavigationAction key={key} icon={menu.icon} value={menu.href} />
          ))}
        </BottomNavigation>
      </Paper>
      <DialogPost title="Post" open={isOpen} onClose={closePostDialog} />
    </>
  );
};

export default BottomMenu;
