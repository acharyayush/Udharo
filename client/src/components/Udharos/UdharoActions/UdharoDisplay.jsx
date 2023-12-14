import React from "react"
import CustomerProfile from "../../Customer/CustomerProfile"
import UdharoTable from "./UdharoTable"
import TransactionList from "./TransactionList"
import UdharoSummary from "./UdharoSummary"
const UdharoDisplay = () => {
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <div className="mx-auto w-fit">
        <UdharoTable readonly />
        <UdharoSummary />
      </div>
      <TransactionList />
    </div>
  )
}

export default UdharoDisplay
