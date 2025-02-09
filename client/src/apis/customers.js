import api from "./api"

export const getHomePageData = async () => {
  try {
    const { data } = await api.get(`/api/customers`)
    //if there is no vendor with that id in database then inform user
    if (data.status === "error") return toast(data.status, data.message)
    return data
  } catch (err) {
    throw err
  }
}
export const getTransactionHistory = async (customerId) => {
  try {
    const { data } = await api.get(
      `/api/customers/${customerId}/transactionHistory`
    )
    return data
  } catch (err) {
    throw err
  }
}
export const createCustomer = async (customerDetail) => {
  const formData = new FormData()
  for (const key in customerDetail){
    formData.append(key, customerDetail[key])
  }
  try {
    const { data } = await api.post(`/api/customers/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return data
  } catch (err) {
    throw err
  }
}
export const deleteCustomer = async ({ customerId }) => {
  try {
    const { data } = await api.delete(`/api/customers/${customerId}/delete`)
    return data
  } catch (err) {
    throw err
  }
}
export const payUdharo = async (detail) => {
  const { customerId, amount } = detail
  try {
    const { data } = await api.post(`/api/customers/${customerId}/repay`, {
      amount,
    })
    return data
  } catch (err) {
    throw err
  }
}
export const uploadCustomerImage = async ({customerId, customerImage}) => {
  try {
    const formData = new FormData()
    formData.append("customerImage", customerImage)
    const { data } = await api.post(
      `/api/customers/${customerId}/profile/upload-customer-image`,
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
