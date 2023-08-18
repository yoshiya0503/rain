import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

type Props = {
  children: ReactNode;
};

export const HistoryLayout = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      {props.children}
    </>
  );
};

export default HistoryLayout;
