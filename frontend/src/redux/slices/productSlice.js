import {
  createAsyncThunk,
  createNextState,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/url";

// export const fetchProductsByFilters = createAsyncThunk(
//   "products/fetchByFilters",
//   async ({
//     collection,
//     size,
//     color,
//     gender,
//     minPrice,
//     maxPrice,
//     sortBy,
//     search,
//     category,
//     material,
//     brand,
//     limit,
//   }) => {
//     const query = new URLSearchParams();
//     if (collection) query.append("collection", collection);
//     if (size) query.append("size", size);
//     if (color) query.append("color", color);
//     if (gender) query.append("gender", gender);
//     if (minPrice) query.append("minPrice", minPrice);
//     if (maxPrice) query.append("maxPrice", maxPrice);
//     if (sortBy) query.append("sortBy", sortBy);
//     if (search) query.append("search", search);
//     if (category) query.append("category", category);
//     if (material) query.append("material", material);
//     if (brand) query.append("brand", brand);
//     if (limit) query.append("limit", limit);

//     try {
//       const response = await API.get(`/products/${query.toString()}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    },
    { rejectWithValue }
  ) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    try {
      const response = await API.get(`/products/?${query.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productFetchId) => {
    const response = await API.get(`/products/${productFetchId}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await API.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  }
);
export const fetchSimilerProducts = createAsyncThunk(
  "products/fetchSimilerProducts",
  async ({ id }) => {
    const respons = await API.get(`products/similer/${id}`);
    return respons.data;
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      brand: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        brand: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProductsByFilters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.products = Array.isArray(action.payload) ? action.payload : [];

      // })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched products:", action.payload); // Add this
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.id === updateProduct._id
        );
        if (index !== -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // similer products
      .addCase(fetchSimilerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = ProductSlice.actions;
export default ProductSlice.reducer;
