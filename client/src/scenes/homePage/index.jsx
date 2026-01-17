import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import ProductsWidget from "../widgets/ProductsWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "100%" : undefined}>
          <MyPostWidget />
          <ProductsWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;