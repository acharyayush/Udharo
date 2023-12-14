import React from "react"

const UdharoSummary = ({ grandTotal, udharoPaid, udharoLeft }) => {
  const getFormattedAmt = (amt) => {
    return amt.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }
  return (
    <div className="my-6 mr-2 flex flex-col items-end [&>*]:mb-2">
      <div className="flex">
        <h3 className=" w-44 text-lg font-medium text-gray-900">Grand Total</h3>{" "}
        <h3 className="text-lg font-medium text-red-500">
          NPR. {getFormattedAmt(4000)}
        </h3>
      </div>
      <div className="relative flex">
        <span className="absolute -left-4 -top-1.5 text-3xl">-</span>
        <h3 className=" w-44 text-lg font-medium text-gray-900">
          Udharo Paid
        </h3>{" "}
        <h3 className="text-lg font-medium text-green-500">
          NPR. {getFormattedAmt(4000)}
        </h3>
      </div>
      <hr className=" h-[3px] w-[19rem] bg-gray-500" />
      <div className="flex">
        <h3 className=" w-44 text-lg font-medium text-gray-900">Udharo Left</h3>{" "}
        <h3 className="text-lg font-medium text-red-500">
          NPR. {getFormattedAmt(4000)}
        </h3>
      </div>
    </div>
  )
}

export default UdharoSummary
