import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "./router";
import theme from "./theme";
// TODO 一旦fallbackしないと画面が真っ白になる問題はこれで放置
import CircularProgress from "@mui/material/CircularProgress";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
