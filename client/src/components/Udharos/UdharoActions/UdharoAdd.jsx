import React from "react"
import CustomerProfile from "../../Customer/CustomerProfile"
import UdharoForm from "./UdharoForm"
import UdharoTable from "./UdharoTable"
const UdharoAdd = () => {
  const grandTotal = 0
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name="Ayush Acharya"
        phoneNumber="9864777435"
        udharoLeft={4545}
      />
      <UdharoForm className={"my-20"} />
      <div className="mx-auto w-fit">
        <UdharoTable />
        <div className="grandTotal my-4 mr-2 flex justify-end">
          <div className="flex">
            <h3 className=" w-32 text-lg font-medium text-gray-900">
              Grand Total
            </h3>{" "}
            <h3 className="text-lg font-medium text-gray-900">
              NPR.{" "}
              {grandTotal.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UdharoAdd
