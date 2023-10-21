import React from "react"
import CustomerProfile from "../customer/CustomerProfile"
import UdharoTable from "../UdharoActions/UdharoTable"
import TransactionList from "./TransactionList"
const UdharoDisplay = () => {
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <UdharoTable readonly />
      <TransactionList />
    </div>
  )
}

export default UdharoDisplay
