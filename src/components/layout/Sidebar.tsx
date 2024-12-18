import { FC } from "react";
import { Call } from "../../types/types";
import { useThemeContext } from "../../theme/useThemeContext";
import {
  Box,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

interface SidebarProps {
  formDataName: string;
  loading: boolean;
  messages: Call[];
  selectedCallId: string | null;
  onSelectCall: (call: Call) => void;
  onDisconnect: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  formDataName,
  loading,
  messages,
  selectedCallId,
  onSelectCall,
  onDisconnect,
}) => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Box
      sx={{
        width: "300px",
        backgroundColor: mode === "dark" ? "#1E1E1E" : "#FFFFFF",
        p: 2,
        boxShadow: 5,
        display: { xs: "none", md: "block" },
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Button
        variant="contained"
        onClick={toggleTheme}
        sx={{ position: "fixed", top: 16, right: 16 }}
      >
        {mode === "light" ? "🌙 Mudar para Dark" : "☀️ Mudar para Light"}
      </Button>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: mode === "dark" ? "#FFFFFF" : "#1E1E1E" }}
        >
          {formDataName}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={onDisconnect}
        >
          Desconectar
        </Button>
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ mt: 2, mb: 1, color: mode === "dark" ? "#FFFFFF" : "#1E1E1E" }}
      >
        Chamadas ativas ({messages.length || 0})
      </Typography>

      <Box
        sx={{
          height: "calc(100% - 100px)",
          overflowY: "auto",
          pr: 1,
        }}
      >
        {loading ? (
          <List>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={60}
                  width={"90%"}
                  sx={{ mb: 1 }}
                />
              ))}
          </List>
        ) : (
          <List>
            {messages.map((item) => (
              <ListItemButton
                key={item.callId}
                onClick={() => onSelectCall(item)}
                sx={{
                  borderRadius: 5,
                  mb: 1,
                  backgroundColor:
                    selectedCallId === item.callId
                      ? "#64b5f6"
                      : "transparent",
                  boxShadow: `3px 3px 2px #64b5f6`,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#8bc34a" }}>
                    {item.caller[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    color: mode === "dark" ? "#FFFFFF" : "#000000", // Define a cor do texto conforme o tema
                    fontWeight: "bolder",
                  }}
                  primary={
                    <Typography fontWeight="bold">{item.caller}</Typography>
                  }
                  secondary={`Serviço: ${item.service}`}
                  secondaryTypographyProps={{
                    color: mode === "dark" ? "white" : "black",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
