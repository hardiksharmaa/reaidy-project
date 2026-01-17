import { Box, useMediaQuery, Typography, Divider, Button, Paper, IconButton, Avatar, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "../../state";
import { Add, Delete, Edit } from "@mui/icons-material"; 
import Navbar from "../navbar";
import ProductsWidget from "../widgets/ProductsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import Hero from "./Hero"; 
import CategoryBar from "./CategoryBar";
import { toast } from "react-toastify";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.auth.products);
  const dispatch = useDispatch();
  
  const isAdmin = user && user.role === "admin";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }, 
        });
        const data = await response.json();
        dispatch(setProducts({ products: data }));
    } catch (error) {
        console.log("Fetch error:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
            toast.success("Product deleted");
            getProducts(); 
        }
    } catch (error) {
        console.log("Delete error:", error);
    }
  };

  const handleOpenAdd = () => {
      setProductToEdit(null); 
      setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
      setProductToEdit(product); 
      setIsModalOpen(true);
  };

  useEffect(() => {
      if(isAdmin) getProducts();
  }, [isAdmin]); 

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/50";
    if (image.startsWith("http")) return image;
    return `/${image.startsWith("/") ? image.slice(1) : image}`;
  };

  return (
    <Box>
      <Navbar />
      
      {!isAdmin && (
        <>
            <Hero />
            <CategoryBar />
             <Box
                id="products-section"
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="space-between"
            >
                <Box flexBasis="100%">
                    <ProductsWidget />
                </Box>
            </Box>
        </>
      )}

      {isAdmin && (
        <Box width="100%" padding="3rem 6%" minHeight="80vh" bgcolor="#f9f9f9">
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h2" fontWeight="bold" color="#1A237E" mb={1}>
                        Inventory Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your store's products and stock levels.
                    </Typography>
                </Box>
                
                <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={handleOpenAdd} 
                    sx={{
                        backgroundColor: "#1A237E",
                        color: "white",
                        padding: "12px 24px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(26, 35, 126, 0.2)",
                        "&:hover": { backgroundColor: "#0D1460" }
                    }}
                >
                    Add New Product
                </Button>
             </Box>

             <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden" }}>
                <Box 
                    display="grid" 
                    gridTemplateColumns="0.5fr 2fr 1fr 1fr 1fr" 
                    p="15px 25px" 
                    bgcolor="#f4f6f8"
                    fontWeight="bold"
                    color="#637381"
                    fontSize="14px"
                    borderBottom="1px solid #e0e0e0"
                >
                    <Typography>IMAGE</Typography>
                    <Typography>PRODUCT NAME</Typography>
                    <Typography>CATEGORY</Typography>
                    <Typography>PRICE</Typography>
                    <Typography textAlign="right">ACTIONS</Typography>
                </Box>

                {loading ? (
                    <Box p={6} textAlign="center"><CircularProgress /></Box>
                ) : (
                    products.map((product) => (
                        <Box key={product._id}>
                            <Box 
                                display="grid" 
                                gridTemplateColumns="0.5fr 2fr 1fr 1fr 1fr" 
                                alignItems="center"
                                p="15px 25px"
                                sx={{ 
                                    transition: "0.2s",
                                    "&:hover": { bgcolor: "#f9fafb" } 
                                }}
                            >
                                <Avatar 
                                    src={getImageUrl(product.image)} 
                                    variant="rounded" 
                                    sx={{ width: 45, height: 45, borderRadius: "8px", border: "1px solid #eee" }} 
                                />
                                <Typography fontWeight="600" color="#1A237E">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    bgcolor: "#e3f2fd", color: "#1565c0", 
                                    width: "fit-content", px: 1, py: 0.5, borderRadius: "6px", fontSize: "12px", fontWeight: "bold"
                                }}>
                                    {product.category}
                                </Typography>
                                <Typography fontWeight="bold" color="text.primary">
                                    ${product.price}
                                </Typography>
                                
                                <Box textAlign="right">

                                    <IconButton 
                                        size="small" 
                                        onClick={() => handleOpenEdit(product)} 
                                        sx={{ color: "#637381", mr: 1 }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    
                                    <IconButton 
                                        size="small" 
                                        color="error" 
                                        onClick={() => handleDelete(product._id)}
                                        sx={{ bgcolor: "#fee2e2", "&:hover": { bgcolor: "#fecaca" } }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))
                )}
                 {products.length === 0 && !loading && (
                    <Box p={6} textAlign="center" color="text.secondary">
                        No products found. Start by adding one!
                    </Box>
                )}
             </Paper>

             
             <MyPostWidget 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onProductUpdated={getProducts} 
                productToEdit={productToEdit}
             />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;