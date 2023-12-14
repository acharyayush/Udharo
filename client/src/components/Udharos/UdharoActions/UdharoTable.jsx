import React, { useState } from "react"
import Button from "../../Shared/Button"
import { BsFillTrashFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import Modal from "../../Shared/Modal"
import { GoAlertFill } from "react-icons/go"

const UdharoTable = ({ className, readonly }) => {
  const [openModal, setOpenModal] = useState(false)
  const [productAboutToDelete, setProductAboutToDelete] = useState(null)
  const udharosOfAyush = [
    {
      product: "Egg",
      quantity: 30,
      unitPrice: 18,
    },
    {
      product: "Tooth Brush",
      quantity: 2,
      unitPrice: 40,
    },
    {
      product: "Current Noodle",
      quantity: 30,
      unitPrice: 50,
    },
    {
      product: "Potato",
      quantity: 2,
      unitPrice: 55,
    },
    {
      product: "Chini",
      quantity: 1,
      unitPrice: 95,
    },
    {
      product: "Rice",
      quantity: 20,
      unitPrice: 45,
    },
  ]
  const renderTableBody = () => {
    return udharosOfAyush.map(({ product, quantity, unitPrice }, index) => {
      return (
        <tr
          className={`text-center text-gray-900 ${index % 2 && "bg-green-100"}`}
          key={index}
        >
          <td className="min-w-[70px] whitespace-nowrap border-r px-4 py-1.5 text-center text-base">
            {index + 1}
          </td>
          <td className="min-w-[250px] whitespace-nowrap border-r px-4 py-1.5 text-left text-base">
            {product}
          </td>
          <td className="min-w-[100px] whitespace-nowrap border-r px-4 py-1.5 text-base">
            {quantity}
          </td>
          <td className="min-w-[150px] whitespace-nowrap border-r px-4 py-1.5 text-base">
            {unitPrice}
          </td>
          <td className="min-w-[150px] whitespace-nowrap border-r px-4 py-1.5 text-base">
            {quantity * unitPrice}
          </td>
          {!readonly && (
            <td className="min-w-[70px] whitespace-nowrap px-4 py-1.5 text-base">
              <Button
                Icon={BsFillTrashFill}
                className={"rounded-full bg-red-500 p-1"}
                onClick={() => {
                  setProductAboutToDelete(product)
                  setOpenModal(true)
                }}
              />
            </td>
          )}
        </tr>
      )
    })
  }
  return (
    <>
      <div
        className={twMerge(
          "udharoProductList m-auto overflow-x-auto",
          className
        )}
      >
        <div className="mx-auto w-fit">
          <h1 className="mb-4 text-left text-2xl font-bold uppercase text-brightGreen">
            Udharo Products
          </h1>
          <table className="rounded-md shadow-md">
            <thead>
              <tr className="bg-brightGreen text-center text-white">
                <th className="min-w-[70px] whitespace-nowrap border-r px-4 py-2 text-center text-lg font-medium">
                  SN
                </th>
                <th className="min-w-[250px] whitespace-nowrap border-r px-4 py-2 text-left text-lg font-medium">
                  Product Name
                </th>
                <th className="min-w-[100px] whitespace-nowrap border-r px-4 py-2 text-lg font-medium">
                  Quantity
                </th>
                <th className="min-w-[150px] whitespace-nowrap border-r px-4 py-2 text-lg font-medium">
                  Unit Price (NPR)
                </th>
                <th className="min-w-[150px] whitespace-nowrap border-r px-4 py-2 text-lg font-medium">
                  Total (NPR)
                </th>
                {!readonly && (
                  <th className="min-w-[70px] whitespace-nowrap px-4 py-2 text-lg font-medium">
                    Delete
                  </th>
                )}
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        onSubmit={() => {}}
        submitVal={"Delete"}
      >
        <GoAlertFill className="mx-auto text-8xl text-red-500 sm:text-6xl" />
        <h1 className="mt-4 text-center text-2xl font-bold sm:text-[1.35rem] sm:leading-[1.85rem] xsm:text-xl">
          Are you sure you want to Delete?
        </h1>
        <p className="my-2 text-center text-base font-medium sm:text-[0.95rem] sm:leading-[1.45rem] xsm:text-sm">
          Do you want to delete {productAboutToDelete} from udharo products?
          This process cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default UdharoTable
