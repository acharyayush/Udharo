import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  isLoggedIn: false,
}
const VendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    addVendorInfo: (state, { payload }) => {
      Object.assign(state, payload)
    },
    addAvatar: (state, { payload }) => {
      state.avatar = payload
    },
    setLoggedIn: (state, {payload}) => {
      state.isLoggedIn = payload
    },
    resetVendorInfo: (state)=>{
      Object.assign(state, initialState)
    }
  },
})
export const { addVendorInfo, addAvatar, setLoggedIn, resetVendorInfo } = VendorSlice.actions
export default VendorSlice.reducer
