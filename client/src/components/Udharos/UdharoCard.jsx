import React, { useState, useEffect } from "react"
import { BiUserCircle, BiEdit } from "react-icons/bi"
import { BsFillTrashFill } from "react-icons/bs"
import Button from "../Shared/Button"
import { Link } from "react-router-dom"
const UdharoCard = ({
  id,
  customerImg,
  customerName,
  lastModified,
  amountLeft,
  screenSize,
}) => {
  const formattedDate = lastModified.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedAmount = amountLeft.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  const renderCustomerImage = () => {
    if (customerImg) {
      return (
        <img
          src={customerImg}
          alt="customer img"
          className="h-44 w-44 rounded-l-xl object-cover"
        />
      )
    }
    return <BiUserCircle className="text-7xl text-brightGreen sm:mb-2" />
  }
  return (
    <div className="UdharoCard relative mt-4 flex min-w-[425px] cursor-pointer items-center rounded-md bg-white p-4 shadow-md duration-200 hover:scale-[1.02] sm:min-w-fit sm:flex-col">
      <Link
        to={`udharos/${id}`}
        className="absolute left-0 top-0 h-full w-full"
      ></Link>
      <div>{renderCustomerImage()}</div>
      <div className="udharoDetails text-textColor ml-6 text-left sm:ml-0 sm:text-center">
        <div className="customerName text-xl">{customerName}</div>
        <p className="text-sm text-gray-700">Last Modified: {formattedDate}</p>
        <h1 className="mb-4 mt-1 text-xl">NPR. {formattedAmount}</h1>
      </div>
      <div className="actions z-2 absolute bottom-5 right-5 sm:relative sm:bottom-0 sm:right-0 sm:mb-2">
        <Button
          className={
            "xsm:mr-2 mr-3 bg-red-500 px-3 font-medium duration-200 hover:bg-red-600"
          }
          value={screenSize > 767 || screenSize < 639 ? "Delete" : ""}
          Icon={BsFillTrashFill}
        />
        <Button
          className={
            "bg-green-500 px-3 font-medium duration-200 hover:bg-green-600"
          }
          value={screenSize > 767 || screenSize < 639 ? "Edit" : ""}
          Icon={BiEdit}
          destination={`/udharo/edit/${id}`}
        />
      </div>
    </div>
  )
}

export default UdharoCard
