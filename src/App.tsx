import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { CustomThemeProvider } from "./theme/themeProvider";
import PageTransition from "./components/transitions/pageTransition";
import Home from "./pages/home";
import Login from "./pages/login";

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <CustomThemeProvider>
      <Suspense>
        <Routes>
          <Route element={<PageTransition />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </CustomThemeProvider>
  );
};
