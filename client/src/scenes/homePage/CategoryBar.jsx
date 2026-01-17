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

    const neutralLight = theme.palette.neutral?.light || "#F0F0F0";

    // Fetch categories from DB
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
            padding="1.5rem 6%" // Matches page padding
            bgcolor={theme.palette.background.default}
            display="flex"
            flexDirection={isNonMobile ? "row" : "column"} // Stack on mobile, row on desktop
            justifyContent="space-between" // Pushes Search to Left, Categories to Right
            alignItems="center"
            gap="1rem"
        >
            {/* LEFT SIDE: SEARCH BAR */}
            <Box
                backgroundColor={neutralLight}
                borderRadius="9px"
                padding="0.3rem 1.5rem"
                display="flex" 
                alignItems="center"
                width={isNonMobile ? "300px" : "100%"} // Fixed width on desktop
            >
                <InputBase 
                    placeholder="Search for products..." 
                    sx={{ width: "100%" }}
                    onChange={(e) => dispatch(setSearchQuery({ search: e.target.value }))}
                />
                <IconButton>
                    <Search />
                </IconButton>
            </Box>

            {/* RIGHT SIDE: CATEGORIES */}
            <Box 
                display="flex" 
                flexWrap="wrap" 
                justifyContent={isNonMobile ? "flex-end" : "center"} // Align right on desktop
                gap="0.5rem"
            >
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        onClick={() => dispatch(setSelectedCategory(cat === "All" ? null : cat))}
                        sx={{
                            fontSize: "14px",
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: selectedCategory === cat || (cat === "All" && !selectedCategory)
                                ? theme.palette.primary.main 
                                : theme.palette.background.alt,
                            color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                                ? "white" 
                                : theme.palette.neutral.dark,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.light,
                                color: "white"
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