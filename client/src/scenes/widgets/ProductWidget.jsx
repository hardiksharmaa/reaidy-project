import { useState } from "react";
import { 
    Button, 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions,
    Typography, 
    useTheme, 
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Box,
    Chip,
    Rating
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setProducts } from "../../state";
import { AddShoppingCart, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const ProductWidget = ({
  _id,
  name,
  description,
  price,
  category,
  imagePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editCategory, setEditCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(imagePath);
  
  const isAdmin = user && user.role === "admin";
  const primaryMain = theme.palette.primary.main;

  const addItem = (e) => {
    e.stopPropagation(); 
    dispatch(addToCart({ product: { _id, name, price, image: imagePath } }));
    
    toast.success(`${name} added to cart!`, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
  };

  const handleDelete = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) refreshProducts();
    setOpenConfirm(false);
  };

  const handleEdit = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${_id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: editName,
            price: Number(editPrice),
            category: editCategory,
            description: editDescription,
            image: editImage
        })
    });

    if (response.ok) {
        refreshProducts();
        setOpenEdit(false);
    } else {
        toast.error("Failed to update product."); // Error toast
    }
  };

  const refreshProducts = async () => {
    const productsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
        method: "GET",
    });
    const data = await productsResponse.json();
    dispatch(setProducts({ products: data }));
  }

  return (
    <>
    <Card 
        sx={{
            height: "100%",
            display: "flex", 
            flexDirection: "column",
            borderRadius: "16px",
            position: "relative",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",
            },
            backgroundColor: theme.palette.background.alt,
        }}
    >
      
      {isAdmin && (
          <Box 
            position="absolute"
            zIndex={10}
            top={10}
            right={10}
            display="flex"
            gap="0.5rem"
            bgcolor="rgba(255,255,255,0.8)"
            borderRadius="20px"
            p="2px 5px"
          >
            <IconButton size="small" onClick={() => setOpenEdit(true)} sx={{ color: primaryMain }}>
                <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => setOpenConfirm(true)} sx={{ color: "error.main" }}>
                <Delete fontSize="small" />
            </IconButton>
          </Box>
      )}

      <Box 
        sx={{ position: "relative", height: "200px", overflow: "hidden", cursor: "pointer" }}
        onClick={() => navigate(`/product/${_id}`)}
      >
        <CardMedia
            component="img"
            height="200"
            image={imagePath || "https://via.placeholder.com/150"}
            alt={name}
            sx={{ 
                objectFit: "cover",
                filter: "brightness(0.95)",
            }}
        />
        <Chip 
            label={category} 
            size="small"
            sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "rgba(255,255,255,0.9)",
                fontWeight: "bold",
                fontSize: "10px"
            }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                    mb: 1, 
                    overflow: "hidden", 
                    textOverflow: "ellipsis", 
                    whiteSpace: "nowrap",
                    maxWidth: "70%",
                    cursor: "pointer",
                    "&:hover": { color: theme.palette.primary.light }
                }}
                onClick={() => navigate(`/product/${_id}`)}
            >
            {name}
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
            ${price}
            </Typography>
        </Box>

        <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />

        <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                height: "4.5em",
                lineHeight: "1.5em"
            }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 1 }}>
        <Button 
            variant="contained" 
            startIcon={<AddShoppingCart />}
            onClick={addItem}
            fullWidth
            sx={{
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "14px",
                backgroundColor: primaryMain,
                boxShadow: "none",
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }
            }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>

    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle fontWeight="bold">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove <b>{name}</b> permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disableElevation>Delete</Button>
        </DialogActions>
    </Dialog>

    <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Edit Product</DialogTitle>
        <DialogContent>
            <Box display="flex" flexDirection="column" gap="1.5rem" sx={{ mt: 1 }}>
                <TextField label="Name" fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
                <Box display="flex" gap="1rem">
                    <TextField label="Category" fullWidth value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                    <TextField label="Price" type="number" fullWidth value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                </Box>
                <TextField label="Image URL" fullWidth value={editImage} onChange={(e) => setEditImage(e.target.value)} />
                <TextField label="Description" multiline rows={4} fullWidth value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">Update</Button>
        </DialogActions>
    </Dialog>
    </>
  );
};

export default ProductWidget;