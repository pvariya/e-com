import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/url";

export const fetchProduct = createAsyncThunk(
  "adminProduct/fetchProduct",
  async () => {
    const product = await API.get("/product-Admin", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return product.data;
  }
);

export const createProduct = createAsyncThunk(
  "adminProduct/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const product = await API.post("/product-Admin", productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return product.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "adminProduct/updateUser",
  async ({ id, productData }) => {
    const response = await API.put(`/product-Admin/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  }
);
export const deleteuser = createAsyncThunk(
  "adminProduct/deleteUser",
  async (id) => {
    const response = await API.delete(`/product-Admin/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //create product

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      //update product
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // delete product
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

export default adminProductSlice.reducer;
