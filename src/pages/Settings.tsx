import Layout from "@/templates/Layout";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ProfileHeader from "@/components/ProfileHeader";
import useMe from "@/hooks/useMe";
import useAuthentication from "@/hooks/useAuthentication";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export const Settings = () => {
  const { onLogout } = useAuthentication();
  const me = useMe();
  return (
    <Layout>
      <Box>
        <ProfileHeader profile={me} />
        <Button variant="outlined" startIcon={<LogoutIcon />} onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Layout>
  );
};

export default Settings;
