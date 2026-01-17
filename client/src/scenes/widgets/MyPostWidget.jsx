import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  TextField,
  useMediaQuery,
  Paper
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../state";
import { AddCircleOutline } from "@mui/icons-material";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  // Local state
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handlePost = async () => {
    const formData = {
        name: productName,
        price: Number(price),
        category: category,
        description: description,
        image: image,
        countInStock: 10 
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    const savedProduct = await response.json();

    if (response.ok) {
        alert("Product Added Successfully!");
        setProductName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImage("");
        window.location.reload(); 
    } else {
        alert("Failed to add product: " + savedProduct.message);
    }
  };

  return (
    <Paper
      elevation={3} 
      sx={{
        padding: "2rem",
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
        margin: "2rem auto", 
        maxWidth: isNonMobileScreens ? "600px" : "100%", 
      }}
    >
      <Box display="flex" alignItems="center" gap="1rem" mb="1.5rem">
        <AddCircleOutline sx={{ fontSize: "30px", color: "#1A237E" }} />
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Add New Product
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        <TextField 
            label="Product Name" 
            variant="outlined"
            fullWidth
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
        />
        
        <Box display="flex" gap="1rem">
             <TextField 
                label="Category" 
                variant="outlined"
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            />
            <TextField 
                label="Price ($)" 
                type="number"
                variant="outlined"
                fullWidth
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
        </Box>

        <TextField 
            label="Image URL" 
            variant="outlined"
            fullWidth
            onChange={(e) => setImage(e.target.value)}
            value={image}
            helperText="Paste a valid image link"
        />

        <TextField 
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />
      </Box>

      <Divider sx={{ margin: "2rem 0" }} />

      <Button
        fullWidth
        onClick={handlePost}
        disabled={!productName || !price}
        variant="contained"
        sx={{
          color: "#ffffff",
          backgroundColor: "#1A237E",
          padding: "0.8rem",
          fontWeight: "bold",
          fontSize: "14px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#0D1460",
            cursor: "pointer",
          },
        }}
      >
        PUBLISH PRODUCT
      </Button>
    </Paper>
  );
};

export default MyPostWidget;