import _ from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";
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
    <AppBar
      sx={{ backdropFilter: "blur(12px)" }}
      color="transparent"
      enableColorOnDark
      component="nav"
      // staticにすると透過が難しい
      // position="static"
    >
      <Toolbar>
        <IconButton>
          <MenuIcon sx={{ width: 32, height: 32, color: grey[400] }} />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center" }}>
          ☔
        </Typography>
        <IconButton>
          <Settings sx={{ width: 32, height: 32, color: grey[400] }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
