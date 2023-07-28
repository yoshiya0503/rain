import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#009688",
      // main: "#0097a7",
    },
    secondary: {
      main: "#e666fb",
    },
  },
  typography: {
    fontFamily: ["BIZ UDGothic", "Zen Maru Gothic", "sans-serif"].join(","),
  },
  zIndex: {
    appBar: 1201,
  },
});

export default theme;
