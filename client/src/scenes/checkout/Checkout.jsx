import { Box, Button, Stepper, Step, StepLabel, Paper, Typography, useTheme, Container } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { toast } from "react-toastify"; 

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.auth.cart);
  const token = useSelector((state) => state.auth.token); 
  const user = useSelector((state) => state.auth.user);   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    if (isFirstStep) {
        setActiveStep(activeStep + 1);
    }
    
    if (isSecondStep) {
        makePayment(values);
    }

    actions.setTouched({});
  };

  const makePayment = async (values) => {
      try {
        const requestBody = {
            userId: user._id,
            firstName: values.billingAddress.firstName,
            lastName: values.billingAddress.lastName,
            location: `${values.billingAddress.city}, ${values.billingAddress.state}, ${values.billingAddress.country}, ${values.billingAddress.zipCode}`,
            products: cart,
            totalAmount: cart.reduce((total, item) => total + Number(item.price), 0)
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            toast.success("Order placed successfully! Redirecting...", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            
            dispatch(setIsCartOpen({})); 
            navigate("/"); 
        } else {
            const errorData = await response.json();
            toast.error(`Failed to create order: ${errorData.error || "Unknown error"}`, {
                position: "bottom-left"
            });
        }

      } catch (error) {
          console.log("Error placing order:", error);
          toast.error("Something went wrong. Please try again.", {
             position: "bottom-left"
          });
      }
  };

  return (
    <Box backgroundColor={theme.palette.background.default} minHeight="100vh" py={4}>
      <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: "12px" }}>
            <Typography variant="h2" textAlign="center" fontWeight="bold" mb={3}>
                Checkout
            </Typography>
            
            <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
                <Step key="Billing">
                  <StepLabel>Shipping Address</StepLabel>
                </Step>
                <Step key="Payment">
                  <StepLabel>Payment Details</StepLabel>
                </Step>
            </Stepper>
            
            <Box>
                <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema[activeStep]}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isValid,
                    dirty
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box minHeight="300px"> 
                            {isFirstStep && (
                                <Shipping
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Payment
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                />
                            )}
                        </Box>
                   
                    <Box display="flex" justifyContent="flex-end" gap="20px" mt={4}>
                        {!isFirstStep && (
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{ 
                                borderRadius: "30px", 
                                padding: "10px 30px",
                                fontWeight: "bold",
                                borderColor: theme.palette.neutral.medium
                            }}
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            Back
                        </Button>
                        )}
                        <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!isValid || (!dirty && isFirstStep)} 
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            borderRadius: "30px",
                            padding: "10px 40px",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)"
                            },
                            "&.Mui-disabled": {
                                backgroundColor: theme.palette.neutral.medium,
                                color: "white"
                            }
                        }}
                        >
                        {isSecondStep ? "Place Order" : "Next Payment"}
                        </Button>
                    </Box>
                    </form>
                )}
                </Formik>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};


const checkoutSchema = [

  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      country: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zipCode: yup.string().required("Required"),
    }),
  }),

  yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    phoneNumber: yup.string().required("Required"),
  }),
];

export default Checkout;