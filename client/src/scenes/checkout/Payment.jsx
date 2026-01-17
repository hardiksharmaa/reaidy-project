import { Box, Typography, TextField, useTheme } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  const theme = useTheme();
  
  return (
    <Box>
       <Typography variant="h4" sx={{ mb: "25px" }} fontWeight="600" color={theme.palette.primary.main}>
        Contact & Payment
      </Typography>

      <Box mb={4}>
        <TextField
          fullWidth
          type="text"
          label="Email Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ mb: "1.5rem" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
        />
      </Box>
      
      <Typography variant="h5" sx={{ mb: "15px" }} fontWeight="600">
          Payment Method
      </Typography>
      
      <Box 
          p="1.5rem" 
          border={`2px solid ${theme.palette.primary.main}`}
          borderRadius="12px" 
          bgcolor={theme.palette.primary.light}
          display="flex"
          alignItems="center"
          gap="1rem"
          sx={{ cursor: "pointer", boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }}
      >
          <CreditCardIcon sx={{ fontSize: "40px", color: theme.palette.primary.main }} />
          <Box>
            <Typography fontWeight="bold" variant="h6">Credit / Debit Card</Typography>
            <Typography variant="body2" color="text.secondary">Safe payment via Stripe (Mock)</Typography>
          </Box>
      </Box>
    </Box>
  );
};

export default Payment;