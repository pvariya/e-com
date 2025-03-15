import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/url";

export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/adminOrders",
  async (__DO_NOT_USE__ActionTypes, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin-order", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/admin-order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating order");
    }
  }
);

export const deleteAdminorder = createAsyncThunk(
  "adminOrders/deleteAdminorder",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/admin-order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updateorder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updateorder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updateorder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete admin order
      .addCase(deleteAdminorder.fulfilled, (state, action) => {
        state.loading = true;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export default adminOrderSlice.reducer;
