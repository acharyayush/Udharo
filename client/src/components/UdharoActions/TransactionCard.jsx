import React from "react"

const TransactionCard = ({ createdAt, remark, total, action }) => {
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTotal = total.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return (
    <div className="mt-4 items-center rounded-md bg-white px-5 py-4 shadow-md">
      <p className="text-sm">{formattedDate}</p>
      <p className="text-lg font-medium ">{remark}</p>
      <h1
        className={`${
          action == "buy" ? "text-red-500" : "text-green-500"
        } mt-1 text-xl`}
      >
        NPR. {formattedTotal}
      </h1>
    </div>
  )
}

export default TransactionCard
