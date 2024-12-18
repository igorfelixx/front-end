import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useThemeContext } from "../../theme/useThemeContext"; 

interface HeaderProps {
  formDataName: string;
  onToggleDrawer: () => void;
  onDisconnect: () => void;
}

const Header = ({ formDataName, onToggleDrawer, onDisconnect }: HeaderProps) => {
  const { mode } = useThemeContext(); 
  const iconButtonColor = mode === "dark" ? "inherit" : "default";

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: mode === "light" ? "#FFFFFF" : "#1E1E1E", 
        display: { xs: "block", md: "none" }
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color={iconButtonColor}  
          aria-label="menu"
          onClick={onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{formDataName}</Typography>
        <Button color="error" onClick={onDisconnect}>Sair</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
