import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import useSearch from "@/hooks/useSearch";

export const Search = () => {
  const { keyword, isFocus, onFocus, onSearch, onChangeSearch } = useSearch();

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
