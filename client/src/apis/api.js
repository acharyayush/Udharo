import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
export const setupInterceptor = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401) {
        //unauthorized to access page
        navigate("/auth")
      }
      return Promise.reject(err)
    }
  )
}

export default api
