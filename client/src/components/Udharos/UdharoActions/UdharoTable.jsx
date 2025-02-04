import { useState } from "react"
import Button from "../../Shared/Button"
import { BsFillTrashFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import Modal from "../../Shared/Modal"
import { GoAlertFill } from "react-icons/go"
import { useProductDelete } from "../../../customHooks/mutate"
import Skeleton from "react-loading-skeleton"
import toast from "../../../utils/toast"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
const UdharoTable = ({ className, readonly, products }) => {
  const { customerId } = useParams()
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState({})
  const { mutate: deleteProduct, isPending } = useProductDelete()
  const {id:vendorId} = useSelector((state)=>state.vendor);
  const renderSkeleton = (count) => {
    return Array(count)
      .fill(0)
      .map((el, idx) => {
        {
          return (
            <tr
              key={`row-${idx}`}
              className={`${idx === count - 1 && "border-b"}`}
            >
              {Array(5)
                .fill(0)
                .map((el, index) => {
                  return (
                    <td
                      key={`col-${index}`}
                      className="border-r px-4 py-1.5 text-center text-base"
                    >
                      <Skeleton />
                    </td>
                  )
                })}
              {!readonly && (
                <td className="min-w-[70px] whitespace-nowrap px-4 py-1.5 text-base">
                  <Skeleton />
                </td>
              )}
            </tr>
          )
        }
      })
  }
  const renderEmptyRow = () => {
    return (
      <tr className={`border-b bg-green-100 text-center text-gray-900`}>
        {Array(5)
          .fill(0)
          .map((el, index) => {
            return (
              <td
                key={`empty-row-${index}`}
                className="border-r px-4 py-1.5 text-center text-base"
              >
                -
              </td>
            )
          })}
        {!readonly && (
          <td className="min-w-[70px] whitespace-nowrap px-4 py-1.5 text-base">
            -
          </td>
        )}
      </tr>
    )
  }
  const renderTableBody = () => {
    if (!products) {
      return renderSkeleton(5)
    }
    if (products.length === 0) return renderEmptyRow()
    return products.map(({ _id, name, quantity, unitPrice }, index) => {
      return (
        <tr
          className={`text-center text-gray-900 ${
            index % 2 && "bg-green-100"
          } ${index == products.length - 1 && "border-b"}`}
          key={_id}
        >
          <td className="min-w-[70px] whitespace-nowrap border-r px-4 py-1.5 text-center text-base">
            {index + 1}
          </td>
          <td className="min-w-[250px] whitespace-nowrap border-r px-4 py-1.5 text-left text-base">
            {name}
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
                  setProductToDelete({ productId: _id, name, quantity })
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
          `udharoProductList m-auto overflow-x-auto`,
          className
        )}
      >
        <div className="mx-auto w-fit">
          <h1 className="mb-4 text-left text-2xl font-bold uppercase text-brightGreen">
            Products
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
        onSubmit={() => {
          const { productId } = productToDelete
          deleteProduct(
            { productId, customerId, vendorId },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries(["products", customerId])
                toast(data.status, data.message)
                setOpenModal(false)
              },
              onError: () => toast("error", "Unable to delete product 😕"),
            }
          )
        }}
        submitVal={"Delete"}
        isSubmissionPending={isPending}
      >
        <GoAlertFill className="mx-auto text-8xl text-red-500 sm:text-6xl" />
        <h1 className="mt-4 text-center text-2xl font-bold sm:text-[1.35rem] sm:leading-[1.85rem] xsm:text-xl">
          Are you sure you want to Delete?
        </h1>
        <p className="my-2 text-center text-base font-medium sm:text-[0.95rem] sm:leading-[1.45rem] xsm:text-sm">
          Do you want to delete {productToDelete?.quantity}{" "}
          {productToDelete?.name} from udharo products? This process cannot be
          undone.
        </p>
      </Modal>
    </>
  )
}

export default UdharoTable
