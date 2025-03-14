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
    const { id, firstName, lastName, email, avatar } = data
    return { id, firstName, lastName, email, avatar }
  } catch (err) {
    throw err
  }
}
export const handleLogout = async()=>{
  try{
    await api.delete(`/auth/logout`)
  }
  catch(err){
    throw err
  }
}
export const refreshTheToken = async()=>{
  try{
    await api.post('/auth/refresh')
  }
  catch(err){
    throw err
  }
}