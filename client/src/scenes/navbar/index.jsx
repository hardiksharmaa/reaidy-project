import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  ShoppingBag,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setIsCartOpen } from "../../state"; // Consolidated import
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.auth.cart);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  const theme = useTheme();
  const neutralLight = theme.palette.neutral?.light || "#F0F0F0";
  const dark = theme.palette.neutral?.dark || "#333333";
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = user ? user.name : "Guest";

  return (
    <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        padding="1rem 6%" 
        backgroundColor={alt}
    >
      {/* LEFT SIDE: LOGO */}
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
          }}
        >
          E-CommStore
        </Typography>

        {isNonMobileScreens && (
          <Box
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            display="flex" 
            alignItems="center"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* RIGHT SIDE: ICONS & USER */}
      {isNonMobileScreens ? (
        <Box display="flex" gap="2rem">
            {/* CART ICON (Fixed: Added onClick) */}
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <Badge badgeContent={cart ? cart.length : 0} color="primary">
                    <ShoppingBag sx={{ fontSize: "25px" }} />
                </Badge>
            </IconButton>
          
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
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
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* MOBILE CART ICON (Fixed: Added onClick) */}
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <Badge badgeContent={cart ? cart.length : 0} color="primary">
                    <ShoppingBag sx={{ fontSize: "25px" }} />
                </Badge>
            </IconButton>
            
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;