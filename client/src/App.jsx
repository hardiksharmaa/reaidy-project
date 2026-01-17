import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import CartMenu from "./scenes/global/CartMenu";

function App() {
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'light',
      background: {
        default: "#fcfcfc",
        alt: "#ffffff"
      },
      primary: {
        main: "#00D5FA",
        light: "#E6FBFF",
        dark: "#006B7D",
      }
    },
  }), []);

  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartMenu />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route 
              path="/" 
              element={isAuth ? <HomePage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;