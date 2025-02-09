import api from "./api"

export const getVendorProfile = async () => {
  try {
    const { data } = await api.get(`/api/vendor/profile`)
    return data
  } catch (err) {
    throw err
  }
}
export const uploadAvatar = async (avatar) => {
  try {
    const formData = new FormData()
    formData.append("avatar", avatar)
    const { data } = await api.post(
      "/api/vendor/profile/upload-avatar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    return data
  } catch (err) {
    throw err
  }
}
