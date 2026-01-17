import { useEffect, useState } from "react";
import { Box, Chip, useTheme, InputBase, IconButton, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, setSearchQuery } from "../../state";

const CategoryBar = () => {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.auth.selectedCategory);
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/categories`);
            const data = await response.json();
            setCategories(["All", ...data]);
        };
        fetchCategories();
    }, []);

    return (
        <Box 
            width="100%" 
            padding="1.5rem 6%" 
            bgcolor={theme.palette.background.default}
            display="flex"
            flexDirection={isNonMobile ? "row" : "column"} 
            justifyContent="space-between" 
            alignItems="center"
            gap="1rem"
        >
            <Box
                backgroundColor="#ffffff" 
                borderRadius="20px"      
                border={`1px solid ${theme.palette.neutral?.medium || "#ccc"}`} Visible Border
                padding="0.4rem 1.5rem"
                display="flex" 
                alignItems="center"
                width={isNonMobile ? "300px" : "100%"} 
                boxShadow="0px 4px 12px rgba(0,0,0,0.08)"
            >
                <InputBase 
                    placeholder="Search for products..." 
                    sx={{ width: "100%" }}
                    onChange={(e) => dispatch(setSearchQuery({ search: e.target.value }))}
                />
                <IconButton type="button" sx={{ p: 1 }}>
                    <Search sx={{ color: theme.palette.primary.main }} />
                </IconButton>
            </Box>


            <Box 
                display="flex" 
                flexWrap="wrap" 
                justifyContent={isNonMobile ? "flex-end" : "center"} 
                gap="0.5rem"
            >
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        onClick={() => dispatch(setSelectedCategory(cat === "All" ? null : cat))}
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            padding: "22px 10px",
                            cursor: "pointer",
                            backgroundColor: selectedCategory === cat || (cat === "All" && !selectedCategory)
                                ? theme.palette.primary.main 
                                : "#ffffff",
                            border: selectedCategory === cat 
                                ? "none" 
                                : `1px solid ${theme.palette.neutral.medium}`, 
                            color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                                ? "white" 
                                : theme.palette.neutral.dark,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.light,
                                color: "white",
                                border: "1px solid transparent"
                            },
                            transition: "all 0.3s ease"
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CategoryBar;