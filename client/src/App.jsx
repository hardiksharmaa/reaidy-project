import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage"; 
import CartMenu from "./scenes/global/CartMenu"; 
import Checkout from "./scenes/checkout/Checkout";
import ProductDetails from "./scenes/productDetails/ProductDetails";
import OrdersPage from "./scenes/orders/OrdersPage";
import Footer from "./scenes/global/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = useMemo(() => createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0F172A",
        light: "#334155",
        dark: "#020617",  
        contrastText: "#ffffff" 
      },
      secondary: {
        main: "#D97706",
        light: "#F59E0B",
        dark: "#B45309",
      },
      neutral: {
        dark: "#333333",
        main: "#64748B", 
        mediumMain: "#94A3B8",
        medium: "#CBD5E1",
        light: "#F1F5F9"
      },
      background: {
        default: "#f6f6f6",
        alt: "#FFFFFF" 
      },
      action: {
        hover: "rgba(15, 23, 42, 0.04)" 
      }
    },
    typography: {
      fontFamily: ["Inter", "Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 40, fontWeight: 700, color: "#0F172A" },
      h2: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 32, fontWeight: 600, color: "#0F172A" },
      h3: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 24, fontWeight: 600, color: "#0F172A" },
      h4: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 20, fontWeight: 600, color: "#0F172A" },
      h5: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 16, fontWeight: 500, color: "#0F172A" },
      h6: { fontFamily: ["Rubik", "sans-serif"].join(","), fontSize: 14, fontWeight: 500 },
      button: { fontWeight: 600, textTransform: "none" }
    },
    shape: { borderRadius: 8 }
  }), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <ToastContainer 
            position="bottom-left" 
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <CartMenu />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;