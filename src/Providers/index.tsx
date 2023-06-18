"use client";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "Layout";

import theme from "services/theme";
import { ChildrenType } from "types";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { Inter } from "next/font/google";
import { createContext, useState } from "react";
import ReduxProvider from "services/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const LanguageContext = createContext<{
  appDirection: string;
  setAppDirection: (dir: "ltr" | "rtl") => void;
  appLanguage: string;
  setAppLanguage: (lang: string) => void;
} | null>(null);

const Providers = (props: ChildrenType) => {
  const { children } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [appDirection, setAppDirection] = useState<"ltr" | "rtl">("ltr");
  const [appLanguage, setAppLanguage] = useState<string>("en");

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  // Create ltr cache
  const cacheLtr = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
  });

  return (
    <ReduxProvider>
      <LanguageContext.Provider
        value={{
          appDirection,
          setAppDirection: (dir) => setAppDirection(dir),
          appLanguage,
          setAppLanguage: (lang) => setAppLanguage(lang),
        }}
      >
        <CacheProvider value={appDirection === "rtl" ? cacheRtl : cacheLtr}>
          <ThemeProvider theme={theme({ prefersDarkMode, appDirection })}>
            <CssBaseline />
            <html lang={appLanguage} dir={appDirection}>
              <body className={inter.className}>
                <Layout>
                  <Box sx={{ dir: appDirection }}>{children}</Box>
                </Layout>
              </body>
            </html>
          </ThemeProvider>
        </CacheProvider>
      </LanguageContext.Provider>
    </ReduxProvider>
  );
};

export default Providers;
