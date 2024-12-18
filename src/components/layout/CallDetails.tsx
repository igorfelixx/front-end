import { FC } from "react";
import { Typography, Divider, Button } from "@mui/material";


import { useThemeContext } from "../../theme/useThemeContext"; 

interface Call {
  callId: string;
  caller: string;
  media: string;
  service: string;
  startDate: string;
}

interface CallDetailsProps {
  selectedCall: Call;
  onEndCall: () => void;
}

const CallDetails: FC<CallDetailsProps> = ({ selectedCall, onEndCall }) => {

  const {mode} = useThemeContext()
  
  return (
    <div style={{color: mode ==="light" ? "black" : "white"}}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {selectedCall.caller}
      </Typography>
      <Divider sx={{ my: 2, backgroundColor:"#121a23"  }} />
      <Typography>
        <strong>Call ID:</strong> {selectedCall.callId}
      </Typography>
      <Typography>
        <strong>Media:</strong> {selectedCall.media}
      </Typography>
      <Typography>
        <strong>Service:</strong> {selectedCall.service}
      </Typography>
      <Typography>
        <strong>Start Date:</strong> {selectedCall.startDate}
      </Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={onEndCall}
      >
        Finalizar Chamada
      </Button>
    </div>
  );
};

export default CallDetails;
