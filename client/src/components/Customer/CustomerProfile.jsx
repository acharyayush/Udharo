import { BiSolidUserCircle } from "react-icons/bi"
import Skeleton from "react-loading-skeleton"
import Avatar, { AvatarOverlay } from "../Shared/Avatar"
import { ImSpinner2 } from "react-icons/im"
import { useCustomerImageUpload } from "../../customHooks/mutate"
import { useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { FaEdit } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import showToast from "../../utils/toast"
const CustomerProfile = ({ id, name, phoneNumber, imgName, udharoLeft }) => {
  const fileInputRef = useRef(null)
  const { mutate: handleCustomerImageUpload, isPending } =
    useCustomerImageUpload()
  const queryClient = useQueryClient()
  const handleFileInputClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = async (e) => {
    if (fileInputRef) {
      const customerImage = e.target.files[0]
      if (!customerImage) return
      handleCustomerImageUpload(
        { customerId: id, customerImage },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("products")
            showToast("success", "image uploaded successfully")
          },
          onError: (err) => {
            showToast("error", err.message)
          },
        }
      )
    }
  }
  const showCustomerImage = () => {
    return (
      <Avatar
        className={
          "absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-[30px] cursor-pointer rounded-full object-cover sm:h-32 sm:w-32"
        }
        onClick={handleFileInputClick}
      >
        {!imgName ? (
          <>
            <BiSolidUserCircle className="text-[12rem] sm:text-[9rem] text-gray-700"></BiSolidUserCircle>
            {!isPending ? (
              <AvatarOverlay className={"hidden rounded-full group-hover:grid"}>
                <IoMdAdd className="text-[6rem] text-black sm:text-[3rem]" />
              </AvatarOverlay>
            ) : (
              <AvatarOverlay className={"rounded-full"}>
                <ImSpinner2 className="animate-spin text-[6em] text-black sm:text-[3rem]" />
              </AvatarOverlay>
            )}
          </>
        ) : (
          <>
            <img
              src={`${import.meta.env.VITE_SERVER_BASEURL}/uploads/${imgName}`}
              className=" absolute h-full w-full rounded-full object-cover"
              alt="Avatar"
            />
            {!isPending ? (
              <AvatarOverlay className={"hidden rounded-full group-hover:grid"}>
                <FaEdit className="text-[6rem] sm:text-[3rem]" />
              </AvatarOverlay>
            ) : (
              <AvatarOverlay className={"rounded-full"}>
                <ImSpinner2 className="animate-spin text-[6rem] text-black sm:text-[3rem]" />
              </AvatarOverlay>
            )}
          </>
        )}
      </Avatar>
    )
  }
  return (
    <div>
      <section className="CustomerProfileSection 0 mx-auto my-16 max-w-[900px] rounded-lg pb-6 text-gray-900 shadow-lg">
        <div
          className={`customerImg relative m-auto h-24 w-full rounded-md ${
            name && "bg-primary"
          }`}
        >
          {name ? (
            showCustomerImage()
          ) : (
            <Skeleton
              circle
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-[30px] rounded-full object-cover sm:h-32 sm:w-32"
            />
          )}
        </div>
        <div className="customerProfileDetail mx-auto mb-6 mt-28 w-4/5 text-center sm:mt-14">
          <h3 className="mb-1 text-2xl font-bold">
            {name || <Skeleton className="w-2/3 sm:w-[90%]" />}
          </h3>
          <h1 className="text-md mb-2 font-bold sm:text-base">
            {phoneNumber || <Skeleton className="h-5 w-1/2 sm:w-[80%]" />}
          </h1>
          <h1 className="text-2xl font-bold text-red-500  sm:text-xl">
            {udharoLeft != null ? (
              <>
                {"NPR. "}
                {udharoLeft?.toLocaleString("en-NP", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </>
            ) : (
              <Skeleton className="h-8 w-1/3 sm:w-1/2" />
            )}
          </h1>
        </div>
        {/* input for customer image which is always hidden */}
        <input
          type="file"
          className="hidden"
          name="customerImage"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </section>
    </div>
  )
}

export default CustomerProfile
