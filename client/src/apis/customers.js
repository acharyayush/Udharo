import api from "./api"

export const getHomePageData = async (vendorId) => {
  try {
    const { data } = await api.get(`/api/${vendorId}/customers`)
    //if there is no vendor with that id in database then inform user
    if (data.status === "error") return toast(data.status, data.message)
    return data
  } catch (err) {
    throw err
  }
}
export const getTransactionHistory = async (vendorId, customerId) => {
  try {
    const { data } = await api.get(
      `/api/${vendorId}/customers/${customerId}/transactionHistory`
    )
    return data
  } catch (err) {
    throw err
  }
}
export const createCustomer = async ({vendorId, ...customerDetail}) => {
  try {
    const { data } = await api.post(
      `/api/${vendorId}/customers/add`,
      customerDetail
    )
    return data
  } catch (err) {
    throw err
  }
}
export const deleteCustomer = async ({vendorId, customerId}) => {
  try {
    const { data } = await api.delete(
      `/api/${vendorId}/customers/${customerId}/delete`
    )
    return data
  } catch (err) {
    throw err
  }
}
export const payUdharo = async (detail) => {
  const { vendorId, customerId, amount } = detail
  try {
    const { data } = await api.post(
      `/api/${vendorId}/customers/${customerId}/repay`,
      { amount }
    )
    return data
  } catch (err) {
    throw err
  }
}
