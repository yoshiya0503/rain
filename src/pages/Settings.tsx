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
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import GTranslateRoundedIcon from "@mui/icons-material/GTranslateRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Layout from "@/templates/Layout";
import ProfileHeader from "@/components/ProfileHeader";
import HistoryLayout from "@/templates/HistoryLayout";
import DialogHandle from "@/components/DialogHandle";
import DialogInviteCodes from "@/components/DialogInviteCodes";
import useMe from "@/hooks/useMe";
import useAuthentication from "@/hooks/useAuthentication";
import useDialog from "@/hooks/useDialog";

export const Settings = () => {
  const me = useMe();
  const preferences = useStore((state) => state.preferences);
  const { onLogout } = useAuthentication();
  const getPreferences = useStore((state) => state.getPreferences);
  const [isOpenHandle, openHandleDialog, closeHandleDialog] = useDialog();
  const [isOpenCode, openCodeDialog, closeCodeDialog] = useDialog();

  if (_.isEmpty(preferences)) {
    throw getPreferences();
  }

  const specialMenu = [
    { name: "inviteCode", label: "Invite Code", icon: <ConfirmationNumberIcon />, onClick: openCodeDialog },
  ];
  const menu = [
    { name: "appPassword", label: "Add Password", icon: <KeyRoundedIcon />, onClick: () => {} },
    { name: "savedFeed", label: "Saved Feed", icon: <RssFeedRoundedIcon />, onClick: () => {} },
    { name: "contentLanguage", label: "Content Language", icon: <GTranslateRoundedIcon />, onClick: () => {} },
    { name: "changeHandle", label: "Change Handle", icon: <AlternateEmailIcon />, onClick: openHandleDialog },
  ];

  const moderationMenu = [
    { name: "contentFilter", label: "Content Filter", icon: <VisibilityOffRoundedIcon />, onClick: () => {} },
  ];

  return (
    <Layout>
      <HistoryLayout>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
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
          <Typography sx={{ fontWeight: 800 }} variant="subtitle2" color={grey[400]}>
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
          <Typography sx={{ fontWeight: 800 }} variant="subtitle2" color={grey[400]}>
            Moderation
          </Typography>
          <List>
            {_.map(moderationMenu, (item) => (
              <ListItem disablePadding key={item.name}>
                <ListItemButton sx={{ borderRadius: 6 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <DialogHandle open={isOpenHandle} onClose={closeHandleDialog} />
        <DialogInviteCodes open={isOpenCode} onClose={closeCodeDialog} />
      </HistoryLayout>
    </Layout>
  );
};

export default Settings;
