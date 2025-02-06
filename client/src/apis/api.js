import axios from "axios"
import store from "../store/store"
import { setLoggedIn } from "../store/VendorSlice"

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
    async (err) => {
      const originalRequest = err.config
      if (err.response?.status === 401 && err.response?.data?.isIntercepted) {
        if (
          err.response?.data?.tokenStatus == "empty" ||
          originalRequest._retried
        ) {
          store.dispatch(setLoggedIn(false))
          navigate("/auth")
          return Promise.reject(err)
        }
        originalRequest._retried = true
        //try to refresh the token
        try {
          await axios.post(
            "http://localhost:5000/auth/refresh",
            {},
            { withCredentials: true }
          )
          //after successful refresh make a api call of prev request
          return api(originalRequest)
        } catch (refreshErr) {
          store.dispatch(setLoggedIn(false))
          navigate("/auth")
          return Promise.reject(refreshErr)
        }
      }
      return Promise.reject(err)
    }
  )
}

export default api
