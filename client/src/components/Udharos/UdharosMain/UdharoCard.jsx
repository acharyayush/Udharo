import { useState } from "react"
import { BiUserCircle, BiEdit } from "react-icons/bi"
import { BsFillTrashFill } from "react-icons/bs"
import { GoAlertFill } from "react-icons/go"
import Button from "../../Shared/Button"
import { Link } from "react-router-dom"
import Modal from "../../Shared/Modal"
import { useCustomerDelete } from "../../../customHooks/mutate"
import { useQueryClient } from "@tanstack/react-query"
import toast from "../../../utils/toast"
const UdharoCard = ({
  customerId,
  customerImage,
  customerName,
  lastModified,
  udharoLeft,
  screenSize,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const queryClient = useQueryClient()
  const { mutate: deleteCustomer, isPending } = useCustomerDelete()
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
    if (customerImage) {
      return (
        <img
          src={`${
            import.meta.env.VITE_SERVER_BASEURL
          }/uploads/${customerImage}`}
          alt="customer img"
          className="h-24 w-24 rounded-full object-cover"
        />
      )
    }
    return <BiUserCircle className="text-8xl text-primary sm:mb-2" />
  }

  return (
    <>
      <div className="UdharoCard relative mt-4 flex min-w-[425px] cursor-pointer items-center rounded-md bg-white p-4 shadow-md duration-200 hover:scale-[1.02] sm:min-w-fit sm:flex-col">
        <Link
          to={`/${customerId}`}
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
              "bg-primary px-3 font-medium duration-200 hover:bg-primary/90"
            }
            value={screenSize > 767 || screenSize < 639 ? "Edit" : ""}
            Icon={BiEdit}
            destination={`/${customerId}/edit`}
          />
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        onSubmit={() =>
          deleteCustomer(
            { customerId },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries(["homepage"])
                toast(data.status, data.message)
              },
              onSettled: () => setOpenModal(false),
            }
          )
        }
        submitVal={"Delete"}
        submitValForPending={"Deleting..."}
        isSubmissionPending={isPending}
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
