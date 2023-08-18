import Layout from "@/templates/Layout";
import HistoryLayout from "@/templates/HistoryLayout";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ProfileHeader from "@/components/ProfileHeader";
import useMe from "@/hooks/useMe";
import useAuthentication from "@/hooks/useAuthentication";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HandleDialog from "@/components/HandleDialog";
import useDialog from "@/hooks/useDialog";

export const Settings = () => {
  const me = useMe();
  const { onLogout } = useAuthentication();
  const [isOpen, openHandleDialog, closeHandleDialog] = useDialog();

  return (
    <Layout>
      <HistoryLayout>
        <Stack spacing={2}>
          <ProfileHeader profile={me} />
          <Box>
            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={onLogout}>
              Logout
            </Button>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<AlternateEmailIcon />} onClick={openHandleDialog}>
              Change Handle
            </Button>
          </Box>
        </Stack>
        <HandleDialog open={isOpen} onClose={closeHandleDialog} />
      </HistoryLayout>
    </Layout>
  );
};

export default Settings;
