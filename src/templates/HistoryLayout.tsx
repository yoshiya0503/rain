import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Search from "@/components/Search";

type Props = {
  children: ReactNode;
  search?: boolean;
};

// TODO コンテンツの上じゃなくて横のほうがいいかもしれない
export const HistoryLayout = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ pt: 0.5, pb: 0.5 }} spacing={1} direction="row" alignItems="center" justifyContent="flex-start">
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon fontSize="inherit" />
        </IconButton>
        {props.search && <Search />}
      </Stack>
      {props.children}
    </>
  );
};

export default HistoryLayout;
