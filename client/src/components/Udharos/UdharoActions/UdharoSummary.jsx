const UdharoSummary = ({ grandTotal, udharoPaid, udharoLeft }) => {
  const getFormattedAmt = (amt) => {
    if (amt == undefined) return
    return amt.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }
  return (
    <div className="my-6 flex max-w-[739px] flex-col items-end [&>*]:mb-2">
      <div className="flex w-[280px] justify-between xsm:w-[250px]">
        <h3 className="text-lg font-medium text-gray-900 xsm:text-base">
          Grand Total
        </h3>{" "}
        <h3 className="text-lg font-medium text-red-500 xsm:text-base">
          NPR. {getFormattedAmt(grandTotal) || "XXXX"}
        </h3>
      </div>
      <div className="relative flex w-[280px] justify-between xsm:w-[250px]">
        <span className="absolute -left-4 -top-1.5 text-3xl">-</span>
        <h3 className=" text-lg font-medium text-gray-900 xsm:text-base">
          Udharo Paid
        </h3>{" "}
        <h3 className="text-lg font-medium text-green-500 xsm:text-base">
          NPR. {getFormattedAmt(udharoPaid) || "XXXX"}
        </h3>
      </div>
      <hr className=" h-[3px] w-[18rem] bg-gray-500 xsm:w-[16rem]" />
      <div className="flex w-[280px] justify-between xsm:w-[250px]">
        <h3 className="text-lg font-medium text-gray-900 xsm:text-base">
          Udharo Left
        </h3>
        <h3 className="text-lg font-medium text-red-500 xsm:text-base">
          NPR. {getFormattedAmt(udharoLeft) || "XXXX"}
        </h3>
      </div>
    </div>
  )
}

export default UdharoSummary
