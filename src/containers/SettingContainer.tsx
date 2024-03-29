import _ from "lodash";
import { useStore } from "@/stores";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
// import ViewComfyRoundedIcon from "@mui/icons-material/ViewComfyRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ProfileHeader from "@/components/ProfileHeader";
import DialogHandle from "@/components/DialogHandle";
import DialogInviteCodes from "@/components/DialogInviteCodes";
import DialogPasswords from "@/components/DialogPasswords";
import DialogContentFilter from "@/components/DialogContentFilter";
import DialogFeed from "@/components/DialogFeed";
import useMe from "@/hooks/useMe";
import useAuthentication from "@/hooks/useAuthentication";
import useDialog from "@/hooks/useDialog";

export const Settings = () => {
  const me = useMe();
  const preferences = useStore((state) => state.preferences);
  const savedFeeds = useStore((state) => state.savedFeeds);
  const inviteCodes = useStore((state) => state.inviteCodes);
  const appPasswords = useStore((state) => state.appPasswords);
  const { onLogout } = useAuthentication();
  const getPreferences = useStore((state) => state.getPreferences);
  const getInviteCodes = useStore((state) => state.getInviteCodes);
  const listAppPasswords = useStore((state) => state.listAppPasswords);
  const [isOpenHandle, openHandleDialog, closeHandleDialog] = useDialog();
  const [isOpenCode, openCodeDialog, closeCodeDialog] = useDialog();
  const [isOpenPassword, openPasswordDialog, closePasswordDialog] = useDialog();
  const [isOpenFilter, openFilterDialog, closeFilterDialog] = useDialog();
  const [isOpenFeed, openFeedDialog, closeFeedDialog] = useDialog();

  if (_.isEmpty(preferences) || _.isUndefined(inviteCodes) || _.isUndefined(appPasswords)) {
    throw Promise.all([getPreferences(), getInviteCodes(), listAppPasswords()]);
  }

  const specialMenu = [
    { name: "inviteCode", label: "Invite Code", icon: <ConfirmationNumberIcon />, onClick: openCodeDialog },
  ];
  const menu = [
    { name: "appPassword", label: "Add Password", icon: <KeyRoundedIcon />, onClick: openPasswordDialog },
    { name: "savedFeed", label: "Saved Feed", icon: <TagRoundedIcon />, onClick: openFeedDialog },
    // { name: "deck", label: "Home Customize", icon: <ViewComfyRoundedIcon />, onClick: () => {} },
    { name: "changeHandle", label: "Change Handle", icon: <AlternateEmailIcon />, onClick: openHandleDialog },
  ];

  const moderationMenu = [
    { name: "contentFilter", label: "Content Filter", icon: <VisibilityOffRoundedIcon />, onClick: openFilterDialog },
  ];

  return (
    <>
      <Stack spacing={2}>
        <Stack sx={{ p: 1 }} direction="row" spacing={2}>
          <ProfileHeader profile={me} />
          <Box>
            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={onLogout}>
              Logout
            </Button>
          </Box>
        </Stack>
        <List>
          {_.map(specialMenu, (item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton sx={{ borderRadius: 6 }} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontWeight: 700 }}>{item.label}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography sx={{ p: 1, fontWeight: 800 }} variant="subtitle2" color={grey[400]}>
          Advance Setting
        </Typography>
        <List>
          {_.map(menu, (item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton sx={{ borderRadius: 6 }} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography sx={{ p: 1, fontWeight: 800 }} variant="subtitle2" color={grey[400]}>
          Moderation
        </Typography>
        <List>
          {_.map(moderationMenu, (item) => (
            <ListItem disablePadding key={item.name}>
              <ListItemButton sx={{ borderRadius: 6 }} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
      <DialogHandle open={isOpenHandle} onClose={closeHandleDialog} />
      <DialogInviteCodes open={isOpenCode} onClose={closeCodeDialog} inviteCodes={inviteCodes} />
      <DialogPasswords open={isOpenPassword} onClose={closePasswordDialog} passwords={appPasswords} />
      <DialogContentFilter open={isOpenFilter} onClose={closeFilterDialog} preferences={preferences} />
      <DialogFeed open={isOpenFeed} onClose={closeFeedDialog} feeds={savedFeeds} preferences={preferences} />
    </>
  );
};

export default Settings;
