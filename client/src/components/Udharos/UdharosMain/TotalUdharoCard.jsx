import React from "react"
import { BiWallet } from "react-icons/bi"
const TotalUdharoCard = ({ totalUdharo }) => {
  const udharo = totalUdharo.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  return (
    <div className="TotalUdharoCard mx-auto my-6 max-w-[700px] rounded-md bg-white p-8 shadow-lg">
      <div className="flex items-center">
        <BiWallet className="mr-2 text-2xl" />
        <p className="text-xl">Total Udharos</p>
      </div>
      <h1 className="mt-2 text-2xl font-bold">NPR. {udharo}</h1>
    </div>
  )
}

export default TotalUdharoCard
