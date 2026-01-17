import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { setProducts } from "../../state";
import ProductWidget from "./ProductWidget";

const ProductsWidget = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.products);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
      method: "GET",
    });
    const data = await response.json();

    dispatch(setProducts({ products: data }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Our Products
        </Typography>

        <Box 
            display="grid"
            gridTemplateColumns={isNonMobileScreens ? "repeat(3, 1fr)" : "1fr"}
            gap="20px"
        >
        {products.map(
            ({
            _id,
            name,
            description,
            price,
            category,
            image,
            }) => (
            <ProductWidget
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                category={category}
                imagePath={image}
            />
            )
        )}
        </Box>
    </Box>
  );
};

export default ProductsWidget;