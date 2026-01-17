import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,        
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  Button,
  Divider,
  keyframes 
} from "@mui/material";
import {
  Menu as MenuIcon, 
  Close,
  ShoppingBag,
  Person,       
  ArrowDropDown,
  ReceiptLong
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setIsCartOpen } from "../../state";
import { useNavigate } from "react-router-dom";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.auth.cart);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  const fullName = user ? user.name : "Guest";

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
      handleClose();
      dispatch(setLogout());
      navigate("/");
  };

  return (
    <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        padding="0.5rem 6%"
        backgroundColor={alt}
        position="sticky"
        top="0"
        zIndex="100"
        boxShadow="0px 2px 10px rgba(0,0,0,0.05)"
        height="60px"
    >
    
      <Box display="flex" alignItems="center" flexShrink={0}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 1.5rem)"
          color="#2666be"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "#6f9fe3",
              cursor: "pointer",
            },
            transition: "color 0.3s",
            whiteSpace: "nowrap"
          }}
        >
          ReaidyStore
        </Typography>
      </Box>

      {user && isNonMobileScreens && (
        <Box 
            sx={{
                flexGrow: 1,
                overflow: "hidden",
                mx: 4, 
                position: "relative",
                height: "24px", 
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f0f4ff", 
                borderRadius: "12px",
                border: "1px solid #e0e7ff"
            }}
        >
            <Box
                sx={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    animation: `${scrollAnimation} 20s linear infinite`,
                    color: theme.palette.primary.main,
                    fontWeight: "600",
                    fontSize: "15px",
                    letterSpacing: "1px"
                }}
            >
                🔥 WINTER SALE IS LIVE! GET 50% OFF ON ALL JACKETS • FREE SHIPPING ON ORDERS OVER $100 • NEW ARRIVALS DROPPED TODAY! 🔥 &nbsp;&nbsp;&nbsp;&nbsp; 🔥 WINTER SALE IS LIVE! GET 50% OFF ON ALL JACKETS • FREE SHIPPING ON ORDERS OVER $100 • NEW ARRIVALS DROPPED TODAY! 🔥
            </Box>
        </Box>
      )}

      {isNonMobileScreens ? (
        <Box display="flex" gap="2rem" alignItems="center" flexShrink={0}>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: "black" }}>
                <Badge badgeContent={cart ? cart.length : 0} color="secondary">
                    <ShoppingBag sx={{ fontSize: "25px" }} />
                </Badge>
            </IconButton>
          
          {user ? (
              <>
                <Button
                    onClick={handleClick}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textTransform: "none",
                        backgroundColor: "#f5f5f5", 
                        padding: "4px 12px", 
                        borderRadius: "30px",       
                        border: "1px solid transparent",
                        "&:hover": {
                             backgroundColor: "white",
                             border: `1px solid ${theme.palette.primary.main}`,
                             boxShadow: "0px 4px 10px rgba(0,0,0,0.05)"
                        },
                        transition: "all 0.3s ease"
                    }}
                >
                    <Person sx={{ color: theme.palette.primary.main, fontSize: "20px" }} />
                    <Typography fontWeight="bold" fontSize="13px" color="text.primary">
                        {fullName}
                    </Typography>
                    <ArrowDropDown sx={{ color: "text.secondary" }} />
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{
                        "& .MuiPaper-root": {
                            marginTop: "5px",
                            minWidth: "160px",
                            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                        }
                    }}
                >
                    <MenuItem 
                        onClick={() => {
                            handleClose();
                            navigate("/orders");
                        }} 
                        sx={{ gap: "10px", fontSize: "13px" }}
                    >
                        <ReceiptLong fontSize="small" />
                        My Orders
                    </MenuItem>
                    
                    <Divider />

                    <MenuItem onClick={handleLogout} sx={{ fontWeight: "bold", gap: "10px", fontSize: "13px" }}>
                        <Close fontSize="small" />
                        Log Out
                    </MenuItem>
                </Menu>
              </>
          ) : (
              <Button 
                variant="contained" 
                onClick={() => navigate("/login")}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    padding: "6px 20px",
                    fontSize: "13px"
                }}
              >
                  SIGN IN
              </Button>
          )}
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={theme.palette.background.default}
            boxShadow="-5px 0 15px rgba(0,0,0,0.1)"
        >
           <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: "black" }}>
                <Badge badgeContent={cart ? cart.length : 0} color="secondary">
                    <ShoppingBag sx={{ fontSize: "25px" }} />
                </Badge>
            </IconButton>
            
            {user ? (
                <Box textAlign="center" display="flex" flexDirection="column" gap={2}>
                    <Typography fontWeight="bold" variant="h4" mb={1}>
                        {fullName}
                    </Typography>
                    
                     <Button 
                        onClick={() => {
                            navigate("/orders");
                            setIsMobileMenuToggled(false);
                        }}
                        variant="text" 
                        color="primary"
                        startIcon={<ReceiptLong />}
                    >
                        My Orders
                    </Button>

                    <Button 
                        onClick={() => {
                            dispatch(setLogout()); 
                            setIsMobileMenuToggled(false);
                            navigate("/");
                        }}
                        variant="outlined" 
                        color="primary"
                    >
                        Log Out
                    </Button>
                </Box>
            ) : (
                <Button 
                    variant="contained" 
                    onClick={() => navigate("/login")}
                >
                    SIGN IN
                </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;