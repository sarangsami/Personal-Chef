"use client";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "Layout";

import theme from "services/theme";
import { ChildrenType } from "types";

const Providers = (props: ChildrenType) => {
  const { children } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={theme({ prefersDarkMode })}>
      <CssBaseline />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

export default Providers;
