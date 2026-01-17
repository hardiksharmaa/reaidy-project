import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MyPostWidget = ({ open, onClose, onProductUpdated, productToEdit }) => {
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  
  // State for form fields
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (open) { 
        if (productToEdit) {
          
            setProductName(productToEdit.name || "");
            setPrice(productToEdit.price || "");
            setCategory(productToEdit.category || "");
            setDescription(productToEdit.description || "");
            setImage(productToEdit.image || "");
        } else {

            setProductName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setImage("");
        }
    }
  }, [open, productToEdit]);

  const handleSubmit = async () => {
    const formData = {
        name: productName,
        price: Number(price),
        category: category,
        description: description,
        image: image,
        countInStock: 10 
    };

    let url = `${import.meta.env.VITE_BASE_URL}/products`;
    let method = "POST";

    if (productToEdit) {
        url = `${import.meta.env.VITE_BASE_URL}/products/${productToEdit._id}`;
        method = "PUT";
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        
        const data = await response.json();

        if (response.ok) {
            onClose(); // Close modal
            if(onProductUpdated) onProductUpdated();
            alert(productToEdit ? "Product Updated!" : "Product Added!");
        } else {
            alert(`Failed to ${productToEdit ? "update" : "add"} product: ` + (data.message || data.error));
        }
    } catch (err) {
        console.log("Error:", err);
        alert("Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", borderBottom: "1px solid #eee" }}>
            {productToEdit ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
            <Box display="flex" flexDirection="column" gap="1.5rem" mt="1.5rem">
                <TextField 
                    label="Product Name" 
                    fullWidth
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                />
                <Box display="flex" gap="1rem">
                    <TextField 
                        label="Category" 
                        fullWidth
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <TextField 
                        label="Price ($)" 
                        type="number"
                        fullWidth
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </Box>
                <TextField 
                    label="Image URL" 
                    fullWidth
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    placeholder="https://..."
                />
                <TextField 
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: "1px solid #eee" }}>
            <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>Cancel</Button>
            <Button 
                onClick={handleSubmit} 
                variant="contained" 
                disabled={!productName || !price}
                sx={{ 
                    bgcolor: palette.primary.main, 
                    color: "white",
                    px: 4,
                    "&:hover": { bgcolor: palette.primary.dark }
                }}
            >
                {productToEdit ? "Update" : "Publish"}
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default MyPostWidget;