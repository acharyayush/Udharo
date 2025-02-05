import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  id: "",
  firstName: "Not",
  lastName: "Known",
  email: "",
  avatar: "",
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
  },
})
export const { addVendorInfo, addAvatar } = VendorSlice.actions
export default VendorSlice.reducer
