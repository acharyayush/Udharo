import api from "./api"

export const getVendorProfile = async()=>{
    try {
        const { data } = await api.get(
          `/api/vendor/profile`
        )
        return data
      } catch (err) {
        throw err
      }
}