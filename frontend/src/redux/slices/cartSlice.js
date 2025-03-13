import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/url";
import reducer from "./autSlice";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const saveCartToStorage = (cartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const respons = await API.get("/cart", {
        params: { userId, guestId },
      });
      return respons.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.respons.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const respons = await API.post("/cart", {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });
      return respons.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async (
    { productId, quantity, guestId, userId, size, color },
    { rejectWithValue }
  ) => {
    try {
      const respons = await API.put(`/cart`, {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });
      return respons.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.respons.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const respons = await API.delete(`/cart`, {
        data: {
          productId,
          size,
          color,
          guestId,
          userId,
        },
      });
      return respons.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.respons.data);
    }
  }
);

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const respons = await API.post(
        `/cart/merge`,
        {
          guestId,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return respons.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.respons.data);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload || "failed to fetch card";
      })
      //   add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "failed to add to card";
      })
      //   update cart itrm quantity
      .addCase(updateCartItemQty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload || "failed to update item qty ";
      })
      //   remove from cart
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload || "failed to remove item";
      })
      //  merge cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload || "failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
