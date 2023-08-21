import { ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

type Props = {
  children: ReactNode;
  search?: boolean;
  keyword?: string;
};

// TODO コンテンツの上じゃなくて横のほうがいいかもしれない
export const HistoryLayout = (props: Props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(props.keyword || "");
  const [isFocus, setFocus] = useState<boolean>(false);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value);
    },
    [setKeyword]
  );

  const onSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        navigate(`/search?q=${keyword}`);
      }
    },
    [keyword, navigate]
  );

  const onFocus = useCallback(() => {
    setFocus(!isFocus);
  }, [isFocus, setFocus]);

  return (
    <>
      <Stack sx={{ pt: 0.5, pb: 0.5 }} spacing={1} direction="row" alignItems="center" justifyContent="flex-start">
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon fontSize="inherit" />
        </IconButton>
        {props.search && (
          <TextField
            fullWidth
            autoComplete="off"
            placeholder="search"
            size="small"
            value={keyword}
            onChange={onChangeSearch}
            onFocus={onFocus}
            onBlur={onFocus}
            onKeyDown={onSearch}
            InputProps={{
              sx: { borderRadius: 10 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon color={isFocus ? "primary" : "disabled"} />
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>
      {props.children}
    </>
  );
};

export default HistoryLayout;
