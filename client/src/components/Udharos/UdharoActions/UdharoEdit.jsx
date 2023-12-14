import React from "react"
import CustomerProfile from "../../Customer/CustomerProfile"
import UdharoSummary from "./UdharoSummary"
import UdharoTable from "./UdharoTable"
const UdharoEdit = () => {
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <div className="mx-auto w-fit">
        <UdharoTable className={"pt-4"} />
        <UdharoSummary />
      </div>
    </div>
  )
}

export default UdharoEdit
