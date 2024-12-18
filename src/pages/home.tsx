import { useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useFormStorage from "../hooks/useFormStorage";
import { useSocket } from "../hooks/useSocket";


import { useThemeContext } from "../theme/useThemeContext"; 

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import DrawerMenu from "../components/layout/DrawerMenu";
import CallDetails from "../components/layout/CallDetails";

interface Call {
  callId: string;
  caller: string;
  media: string;
  service: string;
  startDate: string;
}

const App = () => {
  const navigate = useNavigate();

  const { mode } = useThemeContext(); 
  
  const [loading, setLoading] = useState<boolean>(true);
  const { formData, handleDelete } = useFormStorage();
  const { messages, disconnect, endCall } = useSocket();

  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDisconnect = () => {
    disconnect();
    handleDelete();
    navigate("/login");
  };

  const handleSelectCall = (call: Call) => setSelectedCall(call);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Box
      sx={{
        display: "flex",
        background: `linear-gradient(to right, ${mode === "light" ? "#FFFFFF" : "1E1E1E"}, #FFFFFF)`,
        height: "100vh",
        color: "#fff",
      }}
    >
      <Header
        formDataName={formData.name}
        onToggleDrawer={toggleDrawer}
        onDisconnect={handleDisconnect}
      />

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <DrawerMenu
          formDataName={formData.name}
          loading={loading}
          messages={messages}
          selectedCallId={selectedCall?.callId || null}
          onSelectCall={handleSelectCall}
          onClose={toggleDrawer}
        />
      </Drawer>

      <Sidebar
        formDataName={formData.name}
        loading={loading}
        messages={messages}
        selectedCallId={selectedCall?.callId || null}
        onSelectCall={handleSelectCall}
        onDisconnect={handleDisconnect}
      />

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: `linear-gradient(to right, ${mode === "light" ? "#FFFFFF" : "1E1E1E"}, #FFFFFF)`,
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
          mt: { xs: 8, md: 0 },
        }}
      >
        {selectedCall ? (
          <CallDetails
            selectedCall={selectedCall}
            onEndCall={() => {
              endCall(selectedCall.callId);
              setSelectedCall(null);
            }}
          />
        ) : (
          <Box
            sx={{
              textAlign: "center",
              color: `${mode === "light" ? "#000000" : "#FFFFFF"}`,
            }}
          >
            <h2>Selecione uma chamada para ver os detalhes.</h2>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default App;
