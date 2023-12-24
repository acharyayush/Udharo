import React, { useState, useEffect } from "react"
import { BiUserCircle, BiEdit } from "react-icons/bi"
import { BsFillTrashFill } from "react-icons/bs"
import { GoAlertFill } from "react-icons/go"
import axios from "axios"
import Button from "../../Shared/Button"
import { Link } from "react-router-dom"
import Modal from "../../Shared/Modal"
import toast from "../../../utils/toast"
const UdharoCard = ({
  id,
  avatar,
  customerName,
  lastModified,
  udharoLeft,
  screenSize,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const formattedDate = new Date(lastModified)?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedAmount = Number(udharoLeft)?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  const renderCustomerImage = () => {
    if (avatar) {
      return (
        <img
          src={avatar}
          alt="customer img"
          className="h-44 w-44 rounded-l-xl object-cover"
        />
      )
    }
    return <BiUserCircle className="text-7xl text-brightGreen sm:mb-2" />
  }
  const deleteCustomer = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/65865d8b75a727705c869123/customers/${id}/delete`
      )
      console.log(data)
      toast("success", `Deleted Customer, ${customerName} 😁`)
    } catch (err) {
      toast("error", err.message)
    }
  }
  return (
    <>
      <div className="UdharoCard relative mt-4 flex min-w-[425px] cursor-pointer items-center rounded-md bg-white p-4 shadow-md duration-200 hover:scale-[1.02] sm:min-w-fit sm:flex-col">
        <Link
          to={`udharos/${id}`}
          className="absolute left-0 top-0 h-full w-full"
        ></Link>
        <div>{renderCustomerImage()}</div>
        <div className="udharoDetails text-textColor ml-6 text-left sm:ml-0 sm:text-center">
          <div className="customerName text-xl">{customerName}</div>
          <p className="text-sm text-gray-700">
            Last Modified: {formattedDate}
          </p>
          <h1 className="mb-4 mt-1 text-xl">NPR. {formattedAmount}</h1>
        </div>
        <div className="actions z-2 absolute bottom-5 right-5 sm:relative sm:bottom-0 sm:right-0 sm:mb-2">
          <Button
            className={
              "mr-3 bg-red-500 px-3 font-medium duration-200 hover:bg-red-600 xsm:mr-2"
            }
            onClick={() => setOpenModal(true)}
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
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        onSubmit={deleteCustomer}
        submitVal={"Delete"}
      >
        <GoAlertFill className="mx-auto text-8xl text-red-500 sm:text-6xl" />
        <h1 className="mt-4 text-center text-2xl font-bold sm:text-[1.35rem] sm:leading-[1.85rem] xsm:text-xl">
          Are you sure you want to Delete?
        </h1>
        <p className="my-2 text-center text-base font-medium sm:text-[0.95rem] sm:leading-[1.45rem] xsm:text-sm">
          Do you want to delete udharo of {customerName}? This process cannot be
          undone.
        </p>
      </Modal>
    </>
  )
}

export default UdharoCard
