import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/url";

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchuserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const respons = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return respons.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchorderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const respons = await API.get(`/o/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return respons.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export default orderSlice.reducer;
