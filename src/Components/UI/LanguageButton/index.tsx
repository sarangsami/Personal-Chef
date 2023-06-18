import { Language } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { LanguageContext } from "Providers";
import React from "react";

const languages: {
  id: number;
  name: string;
  value: string;
  direction: "ltr" | "rtl";
}[] = [
  {
    id: 1,
    name: "English",
    value: "en",
    direction: "ltr",
  },
  {
    id: 2,
    name: "Persian",
    value: "fa",
    direction: "rtl",
  },
];

const LanguageButton = () => {
  const parentState = React.useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (value: string, direction: "ltr" | "rtl") => {
    parentState?.setAppDirection(direction);
    parentState?.setAppLanguage(value);
    handleClose();
  };
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Language />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {languages.map(({ id, name, value, direction }) => (
          <MenuItem
            key={id}
            onClick={() => handleLanguageChange(value, direction)}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageButton;
