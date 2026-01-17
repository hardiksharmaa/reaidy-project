import { Box, Typography, useTheme, Container, Paper, Chip, Divider, CircularProgress, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/50";
    if (image.startsWith("http")) return image;
    return `/${image.startsWith("/") ? image.slice(1) : image}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders/${user._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await response.json();
        if (Array.isArray(data)) {
            setOrders(data);
        } else {
            setOrders([]); 
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
        setLoading(false);
      }
    };

    if (user) {
        fetchOrders();
    }
  }, [user, token]);

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;

  return (
    <Box minHeight="100vh" backgroundColor={theme.palette.background.default} py={4}>
      <Container maxWidth="md">
        
        <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate("/")}
            sx={{ mb: 2, color: theme.palette.neutral.dark, fontWeight: "bold" }}
        >
            Back to Home
        </Button>

        <Typography variant="h2" fontWeight="bold" mb={4} textAlign="center">
          ORDER HISTORY
        </Typography>

        {!orders || orders.length === 0 ? (
            <Box textAlign="center" mt={5}>
                <Typography variant="h5" mb={3}>You haven't placed any orders yet.</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>Start Shopping</Button>
            </Box>
        ) : (
            <Box display="flex" flexDirection="column" gap={3}>
            {orders.map((order) => (
                <Paper 
                    key={order._id} 
                    elevation={2} 
                    sx={{ 
                        p: 3, 
                        borderRadius: "12px",
                        border: `1px solid ${theme.palette.neutral.light}`
                    }}
                >
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} mb={2}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Order ID: <span style={{ color: theme.palette.neutral.mediumMain }}>#{order._id.slice(-8).toUpperCase()}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Date: {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box textAlign="right">
                             <Typography variant="h5" fontWeight="bold" color="primary">
                                ${order.totalAmount.toFixed(2)}
                            </Typography>
                            <Chip label="Processing" color="warning" size="small" variant="outlined" />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        {order.products.map((item, i) => (
                            <Box key={`${order._id}-${i}`} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    
                                    <Box 
                                        component="img" 
                                        src={getImageUrl(item.image)} 
                                        alt={item.name}
                                        sx={{ 
                                            width: 50, 
                                            height: 50, 
                                            objectFit: "cover", 
                                            borderRadius: "5px",
                                            backgroundColor: "#eee" 
                                        }}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/50" }} 
                                    />
                                    
                                    <Box>
                                        <Typography fontWeight="600">{item.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">Qty: 1</Typography>
                                    </Box>
                                </Box>
                                <Typography fontWeight="500">${item.price}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            ))}
            </Box>
        )}
      </Container>
    </Box>
  );
};

export default OrdersPage;