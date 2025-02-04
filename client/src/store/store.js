import {configureStore} from "@reduxjs/toolkit"
import VendorReducer from "./VendorSlice";
const store = configureStore({
    reducer: {
        vendor: VendorReducer
    }
})
export default store;