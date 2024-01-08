const BASEURL = "http://localhost:5000"
import axios from "axios"
const vendorId = "65865b1175a727705c869120" // this is fetched from queryClient cache
export const getHomePageData = async () => {
  try {
    const { data } = await axios.get(`${BASEURL}/api/${vendorId}/customers`)
    //if there is no vendor with that id in database then inform user
    if (data.status === "error") return toast(data.status, data.message)
    return data
  } catch (err) {
    throw err
  }
}
export const getTransactionHistory = async (customerId) => {
  try {
    const { data } = await axios.get(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/transactionHistory`
    )
    return data
  } catch (err) {
    throw err
  }
}
export const createCustomer = async (customerDetail) => {
  try {
    const { data } = await axios.post(
      ` ${BASEURL}/api/${vendorId}/customers/add`,
      customerDetail
    )
    return data
  } catch (err) {
    throw err
  }
}
export const deleteCustomer = async (customerId) => {
  try {
    const { data } = await axios.delete(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/delete`
    )
    return data
  } catch (err) {
    throw err
  }
}
export const payUdharo = async (detail) => {
  const { customerId, amount } = detail
  try {
    const { data } = await axios.post(
      `${BASEURL}/api/${vendorId}/customers/${customerId}/repay`,
      { amount }
    )
    return data
  } catch (err) {
    throw err
  }
}
