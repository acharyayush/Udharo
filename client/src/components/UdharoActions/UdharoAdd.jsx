import React from "react"
import CustomerProfile from "../customer/CustomerProfile"
import UdharoForm from "./UdharoForm"
import UdharoTable from "./UdharoTable"
const UdharoAdd = () => {
  return (
    <div>
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <UdharoForm className={"my-20"} />
      <UdharoTable />
    </div>
  )
}

export default UdharoAdd
