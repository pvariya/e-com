import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/url";

export const fetchAdminUser = createAsyncThunk("admin/fetchAdminUser", async () => {
  const respons = await API.get("/admin", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return respons.data;
});

export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const respons = await API.post("/admin/users", userData, {
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

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }) => {
    try {
      const respons = await API.put(
        `/admin/users/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return respons.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await API.delete(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return id;
});
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update user
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("action payload",action.payload);

        const updateUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updateUser._id
        );
        if (userIndex !== 1) {
          state.users[userIndex] = updateUser;
        }
      })
      // delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      // add user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
