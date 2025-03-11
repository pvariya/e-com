import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/autSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutSlice,
    orders: orderReducer,
  },
});

export default store;
