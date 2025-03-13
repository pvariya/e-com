import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/url";

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching orders...");
      const response = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("Orders fetched:", response.data); 
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchorderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const respons = await API.get(`/orders/${id}`, {
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
        console.log("Redux state updated:", action.payload);
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
