import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { grey } from "@mui/material/colors";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Settings from "@mui/icons-material/SettingsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  search?: boolean;
  history?: boolean;
  menu?: boolean;
};

export const HeaderMenu = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  const onClickMenu = (href: string) => {
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        backdropFilter: "blur(12px)",
      }}
      component="nav"
      elevation={0}
      enableColorOnDark
      color="transparent"
    >
      <Toolbar variant={isPhone ? undefined : "dense"} disableGutters={isPhone ? false : true}>
        {props.history && (
          <IconButton size="small" color="primary" onClick={onBack}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
        )}
        {props.menu && (
          <IconButton>
            <MenuIcon sx={{ width: 32, height: 32, color: grey[400] }} />
          </IconButton>
        )}
        {isPhone && (
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center" }}>
            ☔
          </Typography>
        )}
        {isPhone && (
          <IconButton>
            <Settings sx={{ width: 32, height: 32, color: grey[400] }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
