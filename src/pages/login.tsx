import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormStorage from "../hooks/useFormStorage";
import { useThemeContext } from "../theme/useThemeContext";

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Stack,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const StyledContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { formData, handleInputChange, handleSave } = useFormStorage();
  const { toggleTheme, mode } = useThemeContext();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
<<<<<<< HEAD
    const timer = setTimeout(() => setLoading(false), 500); 
=======
    const timer = setTimeout(() => setLoading(false), 500);
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
<<<<<<< HEAD

=======
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
    handleSave();
    navigate("/");
  };

  const redirecionarParaGitHub = () => {
<<<<<<< HEAD
    const url = "https://github.com/igorfelixx/front-end.git";
    window.open(url, "_blank")
};
=======
    const url = "https://github.com/igorfelixx/front-end";
    window.open(url, "_blank");
  };
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)

  return (
    <StyledContainer direction="column" justifyContent="center">
      <Button
        variant="contained"
        onClick={toggleTheme}
        sx={{ position: "fixed", top: 16, right: 16 }}
      >
        {mode === "light" ? "🌙 Mudar para Dark" : "☀️ Mudar para Light"}
      </Button>

      {loading ? (
        <StyledCard>
<<<<<<< HEAD
          <Skeleton variant="text" height={50} width="60%" sx={{ margin: "0 auto" }} />
=======
          <Skeleton
            variant="text"
            height={50}
            width="60%"
            sx={{ margin: "0 auto" }}
          />
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
          <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={40} />
        </StyledCard>
      ) : (
        <StyledCard>
          <Typography component="h1" variant="h4" textAlign="center">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
              required
              fullWidth
            />
            <TextField
              label="Máximo de Chamadas"
              name="maxCalls"
              value={formData.maxCalls}
              type="number"
              onChange={handleInputChange}
              placeholder="Digite o máximo de chamadas"
              inputProps={{ min: 1, max: 10 }}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Box>
        </StyledCard>
      )}
<<<<<<< HEAD
      <Button onClick={redirecionarParaGitHub}>
        Repositório no gitHub
      </Button>
=======
      <Button onClick={redirecionarParaGitHub}>Repositório no gitHub</Button>
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
    </StyledContainer>
  );
};

export default LoginPage;
