const vendorId = "675d951763feccbdb3c081b0" // this is fetched from queryClient cache
import api from "./api"

const getProductsAndUdharo = async (vendorId, customerId) => {
  try {
    const { data } = await api.get(
      `/api/${vendorId}/customers/${customerId}/products`
    )
    return data
  } catch (err) {
    throw err
  }
}
const addProduct = async (detail) => {
  const { vendorId, customerId, ...productDetail } = detail
  try {
    const { data } = await api.post(
      `/api/${vendorId}/customers/${customerId}/products/add`,
      productDetail
    )
    return data
  } catch (err) {
    throw err
  }
}
const deleteProduct = async (detail) => {
  const { vendorId, customerId, productId } = detail
  try {
    const { data } = await api.delete(
      `/api/${vendorId}/customers/${customerId}/products/${productId}/delete`)
    return data
  } catch (err) {
    throw err
  }
}
export { getProductsAndUdharo, addProduct, deleteProduct }
