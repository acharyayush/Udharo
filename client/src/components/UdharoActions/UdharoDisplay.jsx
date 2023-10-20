import React from "react"
import CustomerProfile from "../customer/CustomerProfile"
import UdharoTable from "../UdharoActions/UdharoTable"
const UdharoDisplay = () => {
  return (
    <div>
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <UdharoTable readonly />
    </div>
  )
}

export default UdharoDisplay
