import {
  ChevronLeft,
  ChevronRight,
  NotificationsOutlined,
  Search,
  Menu
} from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import useCustomMediaQuery from "hooks/useCustomMediaQuery";
import  { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import LanguageButton from "Components/UI/LanguageButton";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  mobileOpen?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, mobileOpen }) => ({
  zIndex: mobileOpen ? 0 : theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navigation = (props: { open?: boolean; mobileOpen?: boolean,menuHandler?:()=>void }) => {
  const { open, mobileOpen,menuHandler } = props;
  const { isMd } = useCustomMediaQuery();
  return (
    <AppBar
      open={open}
      mobileOpen={mobileOpen}
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          spacing={2}
          py={2}
        >
          <Stack direction="row" justifyContent="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={menuHandler}
              edge="start"
              sx={{
                marginRight: 2,
              }}
            >
              {isMd ? <Menu /> : open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
            <TextField
              fullWidth
              size="small"
              InputProps={{
                sx: { borderRadius: 2 },
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: (theme) =>
                  theme.palette.mode === "light" ? "white" : "black",
                maxWidth: 300,
                borderRadius: 2,
                ml: isMd ? 0 : 2,
              }}
            />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <NotificationsOutlined />
            </IconButton>
            <LanguageButton/>
            <Avatar />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
