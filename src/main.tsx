import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "@/router";
import Loading from "@/templates/Loading";
import theme from "@/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
