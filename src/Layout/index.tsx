import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";

import useCustomMediaQuery from "hooks/useCustomMediaQuery";
import {
  Drawer,
  Stack,
  alpha,
  ListItemText,
  ListItemIcon,
  ListItem,
  Typography,
  List,
  Box,
} from "@mui/material";
import { ChildrenType } from "types";
import {
  DinnerDiningOutlined,
  History,
  HomeOutlined,
  LocalDining,
  Logout,
  MailOutline,
  Settings,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { usePathname, useRouter } from "next/navigation";
import Navigation from "./Navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface StyledListItemButtonProps extends ListItemButtonProps {
  open?: boolean;
}

const DesktopDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledListItemButtonProps>(({ theme, open }) => ({
  px: 2.5,
  maxHeight: 42,
  borderRadius: open ? 8 : 0,
  "&.Mui-selected": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

export default function MiniDrawer(props: ChildrenType) {
  const { children } = props;
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isMd } = useCustomMediaQuery();
  const { push } = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isMd) {
      setOpen(false);
    }
  }, [isMd]);

  const handleDrawerToggle = () => {
    setMobileOpen(false);
  };

  const menuHandler = () => {
    if (isMd) {
     
      setMobileOpen((prev) => !prev);
    } else {
      if (mobileOpen) {
        setMobileOpen(false);
      }
      setOpen((prev) => !prev);
    }
  };

  const drawerItems = [
    {
      id: 1,
      name: "Home",
      url: "/",
      icon: <HomeOutlined />,
    },
    {
      id: 2,
      name: "Chefs",
      url: "/chefs",
      icon: <LocalDining />,
    },
    {
      id: 3,
      name: "Foods",
      url: "/foods",
      icon: <DinnerDiningOutlined />,
    },
    {
      id: 4,
      name: "Order History",
      url: "/orders",
      icon: <History />,
    },
    {
      id: 5,
      name: "Messages",
      url: "/messages",
      icon: <MailOutline />,
    },
    {
      id: 6,
      name: "Settings",
      url: "/settings",
      icon: <Settings />,
    },
  ];

  const drawerContent = (
    <Stack height="100%" justifyContent="space-between">
      <Box>
        {open || isMd ? (
          <DrawerHeader>
            <Typography
              fontSize={24}
              fontWeight="bold"
              sx={{
                background: `linear-gradient(to right, #f83600 0%, #f9d423 100%)`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              F O O D
            </Typography>
          </DrawerHeader>
        ) : (
          <DrawerHeader />
        )}
        <List sx={{ width: drawerWidth, px: open ? 2 : 0 }}>
          {drawerItems.map(({ id, name, url, icon }) => {
            let isSelected = Boolean(url === pathname);
            return (
              <ListItem
                key={id}
                disablePadding
                sx={{ display: "block", mb: 1.2 }}
              >
                <StyledListItemButton
                  open={open}
                  selected={isSelected}
                  onClick={() => push(url)}
                  sx={{
                    justifyContent: open || mobileOpen ? "initial" : "center",
                    border: (theme) =>
                      open && isSelected
                        ? `1px solid ${theme.palette.primary.main}`
                        : "none",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open || mobileOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: (theme) =>
                        isSelected ? theme.palette.primary.main : "inherit",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{ opacity: open || mobileOpen ? 1 : 0 }}
                  />
                </StyledListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <List sx={{ width: drawerWidth, px: open ? 2 : 0, mb: 2 }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <StyledListItemButton
            open={open}
            sx={{
              justifyContent: open || mobileOpen ? "initial" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open || mobileOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ opacity: open || mobileOpen ? 1 : 0 }}
            />
          </StyledListItemButton>
        </ListItem>
      </List>
    </Stack>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Navigation
        open={open}
        mobileOpen={mobileOpen}
        menuHandler={menuHandler}
      />
      {!isMd && (
        <DesktopDrawer variant="permanent" open={isMd ? false : open}>
          {drawerContent}
        </DesktopDrawer>
      )}
      {isMd && (
        <Drawer
          open={!isMd ? false : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? grey[100] : grey[900],
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
