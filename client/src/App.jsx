import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import UdharosMain from "./components/Udharos/UdharosMain"
import UdharoAdd from "./components/UdharoActions/UdharoAdd"
import UdharoEdit from "./components/UdharoActions/UdharoEdit"
import UdharoDisplay from "./components/UdharoActions/UdharoDisplay"
import CustomerCreate from "./components/customer/CustomerCreate"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<UdharosMain />} />
          <Route path="/udharos/:id" element={<UdharoDisplay />} />
          <Route path="/udharo/add/:id" element={<UdharoAdd />} />
          <Route path="/udharo/edit/:id" element={<UdharoEdit />} />
          <Route path="/createCustomer" element={<CustomerCreate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
