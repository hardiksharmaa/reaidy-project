import { Box, useMediaQuery, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import ProductsWidget from "../widgets/ProductsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import Hero from "./Hero"; 
import CategoryBar from "./CategoryBar";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.auth.user);
  
  const isAdmin = user && user.role === "admin";

  return (
    <Box>
      <Navbar />
      
      {!isAdmin && (
        <>
            <Hero />
            <CategoryBar />
        </>
      )}

      <Box
        id="products-section"
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "100%" : undefined}>
          
          {isAdmin && (
             <Box mb="2rem">
                <Typography variant="h2" fontWeight="bold" sx={{ mb: "15px", color: "#1A237E" }}>
                    Admin Panel
                </Typography>
                <Divider sx={{ mb: "25px" }} />
                <MyPostWidget />
                
                <Typography variant="h4" fontWeight="bold" sx={{ mb: "15px", mt: "40px" }}>
                    Manage Inventory
                </Typography>
             </Box>
          )}

          <ProductsWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;