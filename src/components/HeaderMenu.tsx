import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { grey } from "@mui/material/colors";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Settings from "@mui/icons-material/SettingsRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Search from "@/components/Search";
import DrawerMenu from "@/components/DrawerMenu";

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

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const setting = useCallback(() => {
    if (location.pathname !== "/settings") {
      navigate("/settings");
    }
  }, [navigate, location]);

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
          <IconButton size="small" color="primary" onClick={back}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
        )}
        {props.menu && <DrawerMenu />}
        {isPhone && !props.search && (
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center" }}>
            ☔
          </Typography>
        )}
        {props.search && <Search />}
        {isPhone && (
          <IconButton onClick={setting}>
            <Settings sx={{ width: 32, height: 32, color: grey[400] }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
