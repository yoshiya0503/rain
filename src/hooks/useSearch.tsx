import { useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useSearch = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState<string>(query.get("q") || "");
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
        const path = location.pathname === "/feeds" ? "/feeds" : "/search";
        navigate(`${path}?q=${keyword}`);
      }
    },
    [keyword, navigate, location]
  );

  const onFocus = useCallback(() => {
    setFocus(!isFocus);
  }, [isFocus, setFocus]);

  return { keyword, isFocus, onFocus, onSearch, onChangeSearch } as const;
};

export default useSearch;
