import api from "./api"

const getProductsAndUdharo = async (customerId) => {
  try {
    const { data } = await api.get(
      `/api/customers/${customerId}/products`
    )
    return data
  } catch (err) {
    throw err
  }
}
const addProduct = async (detail) => {
  const { customerId, ...productDetail } = detail
  try {
    const { data } = await api.post(
      `/api/customers/${customerId}/products/add`,
      productDetail
    )
    return data
  } catch (err) {
    throw err
  }
}
const deleteProduct = async (detail) => {
  const { customerId, productId } = detail
  try {
    const { data } = await api.delete(
      `/api/customers/${customerId}/products/${productId}/delete`)
    return data
  } catch (err) {
    throw err
  }
}
export { getProductsAndUdharo, addProduct, deleteProduct }
