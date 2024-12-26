import { useState, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Typography, Stack, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["D", "I", "G", "I", "T", "R", "O"];

const PageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const location = useLocation();

  useLayoutEffect(() => {
    setIsTransitioning(true);
<<<<<<< HEAD
    const timer = setTimeout(() => setIsTransitioning(false), 3000);
    return () => clearTimeout(timer);
=======
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
  }, [location]);

  return (
    <>
      <AnimatePresence mode="wait">
<<<<<<< HEAD
        {isTransitioning && (
=======
        {isTransitioning === true ? (
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
          <Box
            component={motion.div}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
<<<<<<< HEAD
              backgroundColor: theme =>
                `${
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : 'white'
=======
              backgroundColor: (theme) =>
                `${
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : "white"
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
                }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              overflow: "hidden",
            }}
          >
            <Stack direction="row" spacing={2}>
              {LETTERS.map((letter, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 1 }}
                  animate={{
                    y: [50, -10, 50],
                    opacity: [0, 0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      color: (theme) =>
                        `${
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.dark
                            : theme.palette.primary.contrastText
                        }`,
                      position: "relative",
                      letterSpacing: "0.1rem",
                      textShadow: `
                        5px 5px 5px #000000,   /* Rosa */
                        5px 5px 5px #000000,
                        -3px -1px 5px  #25F4EE,   /* Azul */
                        -3px -1px 5px  #25F4EE
                      `,
                      animation: "neonFlicker 3s infinite alternate",
                    }}
                  >
                    {letter}
                  </Typography>
                </motion.div>
              ))}
            </Stack>
          </Box>
<<<<<<< HEAD
        )}
=======
        ): <></>}
>>>>>>> 87c1f38 (:test_tube: test: Criando novos teste)
      </AnimatePresence>
      <Outlet />
      <style>
        {`
          @keyframes neonFlicker {
            0% {
              text-shadow: 
                px 15px 5px #FE2C55,
                px 15px 5px #FE2C55,
                0px 0px 5px  #25F4EE,
                0px 0px 5px  #25F4EE,
            }
            50% {
              text-shadow: 
                px 15px 5px #FE2C55, 
                px 15px 5px #FE2C55,
                0px 0px 5px  #25F4EE,
                0px 0px 5px  #25F4EE,
            }
            100% {
              text-shadow: 
                0px 0px 5px #00f2ea, 
                0px 0px 10px #00f2ea,
                0px 0px 5px  #25F4EE,
                0px 0px 5px  #25F4EE,
            }
          }
        `}
      </style>
    </>
  );
};

export default PageTransition;
