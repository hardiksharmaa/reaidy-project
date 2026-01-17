import { 
    Box, 
    Typography, 
    useTheme, 
    Button, 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";
import { AddShoppingCart } from "@mui/icons-material";

const ProductWidget = ({
  _id,
  name,
  description,
  price,
  category,
  imagePath,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const neutral = theme.palette.neutral?.main || "#333";

  const addItem = () => {
    dispatch(addToCart({ product: { _id, name, price } }));
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "0.55rem", m: "1rem" }}>
      <CardMedia
        component="img"
        height="140"
        image={imagePath || "https://via.placeholder.com/150"}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {category}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: theme.palette.primary.main }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
            size="small" 
            variant="contained" 
            startIcon={<AddShoppingCart />}
            onClick={addItem}
            fullWidth
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductWidget;