import React from "react"
import TransactionCard from "./TransactionCard"
const TransactionList = () => {
  const history = [
    {
      remark: "Bought 13 chowmein each of NPR 35",
      action: "buy",
      total: 325,
      createdAt: new Date(2016),
    },
    {
      remark: "Bought 10 waiwai each of NPR 20",
      action: "buy",
      total: 200,
      createdAt: new Date(2018),
    },
    {
      remark: "Paid for 10 waiwai each of NPR 20",
      action: "pay",
      total: 200,
      createdAt: new Date(2019),
    },
    {
      remark: "Removed 13 waiwai each of NPR 35",
      action: "remove",
      total: 325000,
      createdAt: new Date(2020),
    },
  ]
  const renderTransactionList = () => {
    return history.map(({ remark, action, total, createdAt }, index) => {
      return (
        <TransactionCard
          remark={remark}
          action={action}
          total={total}
          createdAt={createdAt}
          key={index}
        />
      )
    })
  }
  return (
    <div className="TransactionList mx-auto max-w-[740px]">
      <h1 className="mb-4 mt-14 text-left text-2xl font-bold uppercase text-brightGreen sm:text-2xl">
        Transaction History
      </h1>
      {renderTransactionList()}
    </div>
  )
}
export default TransactionList
