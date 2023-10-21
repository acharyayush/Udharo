import React from "react"
import CustomerProfile from "../customer/CustomerProfile"
import UdharoTable from "./UdharoTable"

const UdharoEdit = () => {
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <UdharoTable className={"pt-4"} />
    </div>
  )
}

export default UdharoEdit
