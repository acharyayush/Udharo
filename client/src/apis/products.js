const BASEURL = "http://localhost:5000"
import axios from "axios"
const vendorId = "65865b1175a727705c869120" // this is fetched from queryClient cache

const getProductsAndUdharo = async (customerId) => {
  try {
    const { data } = await axios.get(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/products`
    )
    return data
  } catch (err) {
    throw err
  }
}
const addProduct = async (detail) => {
  const { customerId, ...productDetail } = detail
  try {
    const { data } = await axios.post(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/products/add`,
      productDetail
    )
    return data
  } catch (err) {
    throw err
  }
}
const deleteProduct = async (detail) => {
  const { customerId, productId, amount } = detail
  try {
    const { data } = await axios.delete(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/products/${productId}/delete`,
      { productId, amount }
    )
    return data
  } catch (err) {
    throw err
  }
}
export { getProductsAndUdharo, addProduct, deleteProduct }
