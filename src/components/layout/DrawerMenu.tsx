import { FC } from "react";
import { Call } from "../../types/types";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../../theme/useThemeContext";

interface DrawerMenuProps {
  formDataName: string;
  loading: boolean;
  messages: Call[];
  selectedCallId: string | null;
  onSelectCall: (call: Call) => void;
  onClose: () => void;
}

const DrawerMenu: FC<DrawerMenuProps> = ({
  formDataName,
  loading,
  messages,
  selectedCallId,
  onSelectCall,
  onClose,
}) => {
  const { toggleTheme, mode } = useThemeContext();
  const iconButtonColor = mode === "dark" ? "inherit" : "default";

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: `${mode === "dark" ? "#1E1E1E" : "#FFFFFF"}`,
        height: "100%",
        color: "#fff",
        p: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: `${mode === "dark" ? "#FFFFFF" : "#1E1E1E"}` }}
          variant="h6"
        >
          {formDataName}
        </Typography>
        <IconButton onClick={onClose} color={iconButtonColor}>
          <CloseIcon />
        </IconButton>
      </Box>

      {loading ? (
        <List>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={50}
                width={"100%"}
                sx={{ mb: 1, borderRadius: 5 }}
              />
            ))}
        </List>
      ) : (
        <List sx={{ textAlign: "center" }}>
          {messages.map((item) => (
            <ListItemButton
              key={item.callId}
              onClick={() => {
                onSelectCall(item);
                onClose();
              }}
              sx={{
                borderRadius: 5,
                mb: 1,
                backgroundColor:
                    selectedCallId === item.callId
                      ? mode === "dark" ? "#0d47a1" : "#64b5f6"
                      : "transparent",
                  border: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#8bc34a" }}>
                  {item.caller[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: `${mode === "dark" ? "#FFFFFF" : "#1E1E1E"}`,
                }}
                primary={
                  <Typography fontWeight="bold">{item.caller}</Typography>
                }
                secondary={`Serviço: ${item.service}`}
              />
            </ListItemButton>
          ))}
          <Button variant="contained" onClick={toggleTheme} sx={{}}>
            {mode === "light" ? "🌙 Mudar para Dark" : "☀️ Mudar para Light"}
          </Button>
        </List>
      )}
    </Box>
  );
};

export default DrawerMenu;
