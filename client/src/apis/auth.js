import api from "./api"
export const handleSignup = async (formData) => {
  try {
    const {data} = await api.post(`/auth/signup`, formData)
    const { id, firstName, lastName, email} = data; 
    return { id, firstName, lastName, email }
  } catch (err) {
    throw err
  }
}
export const handleLogin = async (formData) => {
  try {
    const { data } = await api.post(`/auth/login`, formData)
    const { id, firstName, lastName, email } = data
    return { id, firstName, lastName, email }
  } catch (err) {
    throw err
  }
}
