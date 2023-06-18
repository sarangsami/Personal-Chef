import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = (props?: {
  prefersDarkMode?: boolean;
  appDirection?: "rtl" | "ltr";
}) => {
  return createTheme({
    direction: props?.appDirection || "ltr",
    palette: {
      mode: props?.prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#fb7a30",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });
};

export default theme;
