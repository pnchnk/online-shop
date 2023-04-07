import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import productsApi from "../api/products";
import { ProductsSlice } from "./type";

const initialState: ProductsSlice  = {
    products: [],
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productsApi.endpoints.getAllProducts.matchFulfilled,
            (state, { payload }: PayloadAction<any>) => {
                //@ts-ignore
                state.products = payload;             
            }
        );
    },
});

export default productsSlice.reducer;