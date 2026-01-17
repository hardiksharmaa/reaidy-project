import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  
  const linkStyle = {
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": { color: theme.palette.primary.main }
  };

  return (
    <Box 
        marginTop="70px" 
        padding="30px 0" 
        backgroundColor={theme.palette.neutral.light} 
        color={theme.palette.neutral.dark}
        borderTop={`1px solid ${theme.palette.neutral.medium}`} 
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color="#2666be"
            sx={{ letterSpacing: "1px" }}
          >
            ReaidyStore
          </Typography>
          <Typography variant="body2" lineHeight="1.8">
            Elevating your everyday lifestyle with premium essentials. 
            Quality, authenticity, and timeless style woven into every product. 
            Reaidy for the elements, Reaidy for you.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="15px" sx={linkStyle}>Careers</Typography>
          <Typography mb="15px" sx={linkStyle}>Our Stores</Typography>
          <Typography mb="15px" sx={linkStyle}>Terms & Conditions</Typography>
          <Typography mb="15px" sx={linkStyle}>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="15px" sx={linkStyle}>Help Center</Typography>
          <Typography mb="15px" sx={linkStyle}>Track Your Order</Typography>
          <Typography mb="15px" sx={linkStyle}>Corporate Purchasing</Typography>
          <Typography mb="15px" sx={linkStyle}>Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="15px" fontWeight="500">
            Punjab, India
          </Typography>
          <Typography mb="15px" sx={{ wordWrap: "break-word" }}>
            Email: hs489819@gmail.com
          </Typography>
          <Typography mb="15px">(+91) 7889480969</Typography>
        </Box>
      </Box>

      <Box 
        width="80%" 
        margin="auto" 
        mt="40px" 
        textAlign="center"
      >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} ReaidyStore. All Rights Reserved.
          </Typography>
      </Box>
    </Box>
  );
};

export default Footer;