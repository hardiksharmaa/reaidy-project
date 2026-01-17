import { Box, Typography, TextField, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: "25px" }} fontWeight="600" color={theme.palette.primary.main}>
        Shipping Information
      </Typography>
      <Box
        display="grid"
        gap="20px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.firstName}
          name="billingAddress.firstName"
          error={!!touched.billingAddress?.firstName && !!errors.billingAddress?.firstName}
          helperText={touched.billingAddress?.firstName && errors.billingAddress?.firstName}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.lastName}
          name="billingAddress.lastName"
          error={!!touched.billingAddress?.lastName && !!errors.billingAddress?.lastName}
          helperText={touched.billingAddress?.lastName && errors.billingAddress?.lastName}
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          fullWidth
          label="Country"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.country}
          name="billingAddress.country"
          error={!!touched.billingAddress?.country && !!errors.billingAddress?.country}
          helperText={touched.billingAddress?.country && errors.billingAddress?.country}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          label="Street Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.street1}
          name="billingAddress.street1"
          error={!!touched.billingAddress?.street1 && !!errors.billingAddress?.street1}
          helperText={touched.billingAddress?.street1 && errors.billingAddress?.street1}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          label="Apartment, suite, etc. (optional)"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.street2}
          name="billingAddress.street2"
          sx={{ gridColumn: "span 4" }}
        />

        <TextField
          fullWidth
          label="City"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.city}
          name="billingAddress.city"
          error={!!touched.billingAddress?.city && !!errors.billingAddress?.city}
          helperText={touched.billingAddress?.city && errors.billingAddress?.city}
          sx={{ gridColumn: "span 2" }}
        />
         <TextField
          fullWidth
          label="State"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.state}
          name="billingAddress.state"
          error={!!touched.billingAddress?.state && !!errors.billingAddress?.state}
          helperText={touched.billingAddress?.state && errors.billingAddress?.state}
          sx={{ gridColumn: "span 1" }}
        />
         <TextField
          fullWidth
          label="Zip Code"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billingAddress.zipCode}
          name="billingAddress.zipCode"
          error={!!touched.billingAddress?.zipCode && !!errors.billingAddress?.zipCode}
          helperText={touched.billingAddress?.zipCode && errors.billingAddress?.zipCode}
          sx={{ gridColumn: "span 1" }}
        />
      </Box>
    </Box>
  );
};

export default Shipping;