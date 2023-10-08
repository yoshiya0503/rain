import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  keyword?: string;
};

export const Search = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
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
        const path = location.pathname === "/" ? "/search" : location.pathname;
        navigate(`${path}?q=${keyword}`);
      }
    },
    [keyword, navigate, location]
  );

  const onFocus = useCallback(() => {
    setFocus(!isFocus);
  }, [isFocus, setFocus]);

  return (
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
  );
};

export default Search;
