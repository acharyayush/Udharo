import { Routes, Route, useNavigate } from "react-router-dom"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import UdharosMain from "./components/Udharos/UdharosMain/UdharosMain"
import UdharoEdit from "./components/Udharos/UdharoActions/UdharoEdit"
import UdharoDisplay from "./components/Udharos/UdharoActions/UdharoDisplay"
import CustomerCreate from "./components/Customer/CustomerCreate"
import Authentication from "./components/AuthForm/Authentication"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-loading-skeleton/dist/skeleton.css"
import { SkeletonTheme } from "react-loading-skeleton"
import { useEffect } from "react"
import { getVendorProfile } from "./apis/vendors"
import { setupInterceptor } from "./apis/api"
import { useDispatch, useSelector } from "react-redux"
import { addVendorInfo, setLoggedIn } from "./store/VendorSlice"
const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useSelector((state) => state.vendor)
  useEffect(() => {
    setupInterceptor(navigate)
    const fetchData = async () => {
      if (id) return
      try {
        const { _id, email, firstName, lastName, avatar } = await getVendorProfile()
        dispatch(setLoggedIn(true))
        const vendorInfo = { id: _id, email, firstName, lastName, avatar }
        dispatch(addVendorInfo(vendorInfo))
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])
  return (
    <SkeletonTheme baseColor="#c8c8c8" highlightColor="#a2a2a2" duration={1.2}>
      <Nav />
      <Routes>
        <Route path="/" element={<UdharosMain />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/:customerId" element={<UdharoDisplay />} />
        <Route path="/:customerId/edit" element={<UdharoEdit />} />
        <Route path="/customers/add" element={<CustomerCreate />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SkeletonTheme>
  )
}

export default App
