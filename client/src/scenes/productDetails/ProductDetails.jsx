import { Box, Button, Typography, useTheme, Container, CircularProgress, Chip } from "@mui/material";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../state";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${productId}`, {
          method: "GET",
        });
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [productId]);

  if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
      </Box>
  );

  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box width="100%" minHeight="100vh" py="40px" backgroundColor={theme.palette.background.default}>
      <Container maxWidth="lg">
        <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate("/")}
            sx={{ mb: 4, color: theme.palette.neutral.dark }}
        >
            Back to Collection
        </Button>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap="60px">
          
          <Box flex="1" display="flex" justifyContent="center" alignItems="start">
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0px 10px 40px rgba(0,0,0,0.1)"
              }}
            />
          </Box>

          <Box flex="1" display="flex" flexDirection="column" gap="20px">
            <Box>
                <Chip 
                    label={product.category} 
                    sx={{ 
                        mb: 2, 
                        backgroundColor: theme.palette.primary.light, 
                        color: "white",
                        fontWeight: "bold"
                    }} 
                />
                <Typography variant="h2" fontWeight="bold" color={theme.palette.primary.main}>
                {product.name}
                </Typography>
                <Typography variant="h3" fontWeight="600" color={theme.palette.secondary.main} mt={1}>
                ${product.price}
                </Typography>
            </Box>

            <Typography variant="body1" color={theme.palette.neutral.main} lineHeight="1.8" fontSize="16px">
              {product.description}
            </Typography>

            <Box mt={3}>
                <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={() => dispatch(addToCart({ product }))}
                sx={{
                    borderRadius: "30px",
                    padding: "15px 40px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                        transform: "translateY(-2px)",
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
                    },
                    transition: "all 0.3s"
                }}
                >
                Add to Cart
                </Button>
            </Box>

            {/* ADDITIONAL INFO (Static) */}
            <Box mt={4} p={3} bgcolor="white" borderRadius="12px" border={`1px solid ${theme.palette.neutral.light}`}>
                <Typography variant="h6" fontWeight="bold" mb={1}>Product Highlights</Typography>
                <ul style={{ paddingLeft: "20px", color: theme.palette.neutral.main }}>
                    <li>Premium quality materials</li>
                    <li>Ethically sourced</li>
                    <li>Free shipping on orders over $100</li>
                </ul>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetails;