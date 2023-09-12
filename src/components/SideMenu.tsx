import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge";
import Home from "@mui/icons-material/HomeRounded";
import Search from "@mui/icons-material/SearchRounded";
import Feed from "@mui/icons-material/FeedRounded";
import Notifications from "@mui/icons-material/NotificationsRounded";
import AccountCircle from "@mui/icons-material/AccountCircleRounded";
import Settings from "@mui/icons-material/SettingsRounded";
import Create from "@mui/icons-material/CreateRounded";
import ProfileHeader from "@/components/ProfileHeader";
import DialogPost from "@/components/DialogPost";
import useMe from "@/hooks/useMe";
import useRealtime from "@/hooks/useRealtime";
import useDialog from "@/hooks/useDialog";

type Props = {
  type?: "drawer" | "paper";
};

export const SideMenu = (props: Props) => {
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
          <Home />
        </Badge>
      ),
      href: "/",
    },
    { name: "Search", icon: <Search />, href: "/search" },
    { name: "Feeds", icon: <Feed />, href: "/feeds" },
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

  if (props.type === "drawer") {
    const DRAWER_WIDTH = 72;
    return (
      <Drawer
        component="nav"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            overflow: "hidden",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <Avatar
              alt={me.displayName}
              src={me.avatar}
              onClick={(e) => {
                e.stopPropagation();
                const uri = `/profile/${me.handle}`;
                if (location.pathname !== uri) {
                  navigate(uri);
                }
              }}
            />
          </ListItem>
          {_.map(menus, (menu, key) => (
            <ListItem key={key} onClick={onClickMenu(menu.href)}>
              <IconButton>{menu.icon}</IconButton>
            </ListItem>
          ))}
          <ListItem>
            <Fab color="primary" onClick={openPostDialog} size="small">
              <Create />
            </Fab>
            <DialogPost title="Post" open={isOpen} onClose={closePostDialog} />
          </ListItem>
        </List>
      </Drawer>
    );
  }

  return (
    <Paper component="nav" variant="outlined" sx={{ width: 240, height: 540, borderRadius: 3 }}>
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
        <ListItem>
          <Button
            sx={{ width: "100%", borderRadius: 6, fontWeight: 600 }}
            variant="contained"
            startIcon={<Create />}
            onClick={openPostDialog}
          >
            New Post
          </Button>
          <DialogPost title="Post" open={isOpen} onClose={closePostDialog} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default SideMenu;
