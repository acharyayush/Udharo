import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const App = () => {
  return (
    <SkeletonTheme baseColor="#c8c8c8" highlightColor="#a2a2a2" duration={1.2}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<UdharosMain />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/:customerId" element={<UdharoDisplay />} />
          <Route path="/:customerId/edit" element={<UdharoEdit />} />
          <Route path="/customers/add" element={<CustomerCreate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
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
