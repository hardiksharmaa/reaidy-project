import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  cart: [],
  products: [],
  isCartOpen: false,
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
    }
  },
});

export const { 
    setLogin, 
    setLogout, 
    setProducts, 
    addToCart, 
    removeFromCart, 
    setIsCartOpen 
} = authSlice.actions;

export default authSlice.reducer;