import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useCustomMediaQuery = () => {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  return { isXl, isLg, isMd, isSm, isXs };
};

export default useCustomMediaQuery;
