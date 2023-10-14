import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

type Props = {
  children: ReactNode;
  search?: boolean;
};

export const HistoryLayout = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        sx={{
          position: "sticky",
          backdropFilter: "blur(12px)",
        }}
        elevation={0}
        color="transparent"
      >
        <Toolbar variant="dense" disableGutters>
          <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
};

export default HistoryLayout;
