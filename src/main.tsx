import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "@/router";
import LoadingTemplate from "@/templates/LoadingTemplate";
import theme from "@/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoadingTemplate />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
