import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { setProducts } from "../../state";
import ProductWidget from "./ProductWidget";

const ProductsWidget = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.products);
  const searchQuery = useSelector((state) => state.auth.searchQuery);
  const selectedCategory = useSelector((state) => state.auth.selectedCategory); 
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getProducts = async () => {
    let url = `${import.meta.env.VITE_BASE_URL}/products?search=${searchQuery}`;
    
    if (selectedCategory) {
        url += `&category=${selectedCategory}`;
    }

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setProducts({ products: data }));
  };

  useEffect(() => {
    getProducts();
  }, [searchQuery, selectedCategory]); 

  return (
    <Box>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
            PRODUCTS
        </Typography>

        <Box 
            display="grid"
            gridTemplateColumns={isNonMobileScreens ? "repeat(3, 1fr)" : "1fr"}
            gap="20px"
        >
        {products.length > 0 ? (
            products.map(
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
            )
        ) : (
            <Typography variant="h6" color="text.secondary" fontStyle="italic">
                No products found matching your criteria.
            </Typography>
        )}
        </Box>
    </Box>
  );
};

export default ProductsWidget;