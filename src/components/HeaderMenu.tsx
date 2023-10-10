import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Settings from "@mui/icons-material/SettingsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

export const HeaderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickMenu = (href: string) => {
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  return (
    <AppBar sx={{ backdropFilter: "blur(24px)" }} color="transparent" enableColorOnDark>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center" }}>
          ☔
        </Typography>
        <IconButton>
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
