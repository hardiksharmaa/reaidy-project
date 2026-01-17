import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  Drawer,
  useTheme
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Close, DeleteOutline } from "@mui/icons-material";
import { setIsCartOpen, removeFromCart } from "../../state";
import { useNavigate } from "react-router-dom";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.cart);
  const isCartOpen = useSelector((state) => state.auth.isCartOpen);
  const theme = useTheme();

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (

    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => dispatch(setIsCartOpen({}))}
    >
      <Box
        p="30px"
        overflow="auto"
        height="100%"
        width="400px" 
        backgroundColor="white"
      >
        {/* HEADER */}
        <Box mb="30px" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" fontWeight="bold">SHOPPING BAG ({cart.length})</Typography>
          <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
            <Close />
          </IconButton>
        </Box>

        {/* CART LIST */}
        <Box display="flex" flexDirection="column" gap="20px">
          {cart.map((item, index) => (
            <Box key={`${item._id}-${index}`}> 
              <Box display="flex" justifyContent="space-between" alignItems="center" mb="5px">
                 <Box flex="1">
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography fontSize="12px" color="gray">
                        {item.category || "General"}
                    </Typography>
                 </Box>
                 <Typography fontWeight="bold">${item.price}</Typography>
                 <IconButton onClick={() => dispatch(removeFromCart({ id: item._id }))}>
                    <DeleteOutline />
                 </IconButton>
              </Box>
              <Divider /> 
            </Box>
          ))}
          {cart.length === 0 && (
             <Typography color="black" fontStyle="italic">Your cart is empty...</Typography>
          )}
        </Box>

        {/* FOOTER ACTIONS */}
        <Box m="20px 0">
          <Box display="flex" justifyContent="space-between" m="20px 0">
            <Typography fontWeight="bold">SUBTOTAL</Typography>
            <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 0,
              minWidth: "100%",
              padding: "20px 40px",
              m: "20px 0",
              "&:hover": { backgroundColor: theme.palette.primary.dark }
            }}
            onClick={() => {
              navigate("/checkout");
              dispatch(setIsCartOpen({}));
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartMenu;