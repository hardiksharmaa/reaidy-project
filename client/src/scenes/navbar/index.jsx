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
  Button
} from "@mui/material";
import {
  Menu as MenuIcon, 
  Close,
  ShoppingBag,
  Person,       
  ArrowDropDown    
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setIsCartOpen } from "../../state";
import { useNavigate } from "react-router-dom";

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
        padding="1rem 6%" 
        backgroundColor={alt}
        position="sticky"
        top="0"
        zIndex="100"
        boxShadow="0px 2px 10px rgba(0,0,0,0.05)"
    >
      <Box display="flex" alignItems="center" gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: theme.palette.primary.light,
              cursor: "pointer",
            },
            transition: "color 0.3s"
          }}
        >
          E-CommStore
        </Typography>
      </Box>

      {isNonMobileScreens ? (
        <Box display="flex" gap="2rem" alignItems="center">
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
                        padding: "6px 15px",
                        borderRadius: "30px",       
                        border: "1px solid transparent",
                        "&:hover": {
                             backgroundColor: "white",
                             border: `1px solid ${theme.palette.primary.main}`,
                             boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                        },
                        transition: "all 0.3s ease"
                    }}
                >
                    <Person sx={{ color: theme.palette.primary.main }} />
                    <Typography fontWeight="bold" fontSize="14px" color="text.primary">
                        {fullName}
                    </Typography>
                    <ArrowDropDown sx={{ color: "text.secondary" }} />
                </Button>

                {/* DROPDOWN MENU */}
                <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{
                        "& .MuiPaper-root": {
                            marginTop: "10px",
                            minWidth: "150px",
                            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
                        }
                    }}
                >
                    <MenuItem onClick={handleLogout} sx={{ fontWeight: "bold" }}>
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
                    padding: "8px 25px"
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

      {/* MOBILE MENU */}
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
                <Box textAlign="center">
                    <Typography fontWeight="bold" variant="h4" mb={2}>
                        {fullName}
                    </Typography>
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