import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";

const Hero = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        backgroundImage: `url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >

      <Box 
        position="absolute" 
        width="100%" 
        height="100%" 
        bgcolor="rgba(15, 23, 42, 0.5)" 
      />

      <Box 
        zIndex="1" 
        textAlign="center" 
        padding="0 2rem"
        maxWidth="1000px"
      >
        <Typography 
            variant="h1" 
            sx={{ 
                mb: 2,
                color: "#ffffff",
                fontSize: isNonMobileScreens ? "4.5rem" : "2.8rem",
                fontWeight: "600", 
                fontFamily: "'Cinzel', serif", 
                letterSpacing: "6px",         
                textTransform: "uppercase",
                textShadow: "0px 4px 12px rgba(0,0,0,0.6)"
            }}
        >
          REAIDY FOR THE ELEMENTS
        </Typography>
        
        <Typography 
            variant="h3" 
            sx={{ 
                mb: 5, 
                fontWeight: "600", 
                color: "#e2e8f0", 
                fontSize: isNonMobileScreens ? "1.0rem" : "0.9rem",
                letterSpacing: "2px",
                fontFamily: "'Cinzel', serif", 
                textTransform: "uppercase",
            }}
        >
          Discover the latest trends in luxury fashion and modern technology.
        </Typography>

        <Button 
            variant="contained" 
            size="large"
            sx={{
                borderRadius: "15px", 
                padding: "16px 30px",
                fontSize: "14px",
                backgroundColor: theme.palette.secondary.main,
                color: "#ffffff",
                fontWeight: "600",
                letterSpacing: "3px",
                fontFamily: "'Cinzel', serif",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.2)", 
                "&:hover": { 
                    backgroundColor: theme.palette.secondary.dark,
                    transform: "translateY(-2px)",
                    boxShadow: "0px 15px 30px rgba(0,0,0,0.25)",
                    transition: "all 0.3s ease"
                }
            }}
            onClick={() => {
                const element = document.getElementById("products-section");
                element?.scrollIntoView({ behavior: "smooth" });
            }}
        >
            Explore Collection
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;