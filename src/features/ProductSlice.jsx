import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const res = await axios.get("http://localhost:3999/product");
  return res.data;
});

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ title, price }) => {
    const res = await axios.post("http://localhost:3999/product", {
      title,
      price,
    });
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:3999/product/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, title, price }) => {
    const res = await axios.patch(`http://localhost:3999/product/${id}`, {
      title,
      price,
    });

    return res.data
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const ProductSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
        productEntity.updateOne(state, {id: action.payload.id, updates: action.payload })
    }
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
export default ProductSlice.reducer;
