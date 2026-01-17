import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cart: [],
  products: [],
  isCartOpen: false,
  searchQuery: "",
  selectedCategory: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = [];
      state.searchQuery = "";
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    addToCart: (state, action) => {
       state.cart = [...state.cart, action.payload.product];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload.id);
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setSearchQuery: (state, action) => { 
      state.searchQuery = action.payload.search;
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
    }
  },
});

export const { 
    setLogin, 
    setLogout, 
    setProducts, 
    addToCart, 
    removeFromCart, 
    setIsCartOpen,
    setSearchQuery ,
    setSelectedCategory
} = authSlice.actions;

export default authSlice.reducer;