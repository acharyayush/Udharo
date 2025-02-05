import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoMdCloudUpload } from "react-icons/io"
import FormFieldRow from "../Shared/FormFieldRow"
import PhotoInput from "../Shared/PhotoInput"
import Button from "../Shared/Button"
import { useCustomerCreate } from "../../customHooks/mutate"
import toast from "../../utils/toast"
import { useSelector } from "react-redux"
const CustomerCreate = () => {
  const navigate = useNavigate()
  const [customerDetail, setCustomerDetail] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avatar: "",
  })
  const { id: vendorId } = useSelector((state) => state.vendor)
  const { mutate: createCustomer, isPending } = useCustomerCreate()

  const handleFormSubmit = () => {
    //handling front end customerDetail validation
    // .............
    //validation finishes
    createCustomer({...customerDetail, vendorId}, {
      onSuccess: (data) => {
        navigate("/")
        toast(data.status, data.message)
      },
    })
  }
  const handleCustomerDetailChange = (e) => {
    if (e.target.name === "phoneNumber") {
      //only take digits
      e.target.value = e.target.value.replace(/\D/g, "")
    }
    setCustomerDetail({
      ...customerDetail,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <form onSubmit={() => e.preventDefault()}>
      <div className="mx-auto my-12 grid max-w-[700px] grid-cols-2 gap-10 px-4">
        <FormFieldRow
          name={"firstName"}
          label={"First Name"}
          className={"sm:col-span-2"}
          inputValue={customerDetail.firstName}
          onChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"lastName"}
          label={"Last Name"}
          className={"sm:col-span-2"}
          inputValue={customerDetail.lastName}
          onChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"phoneNumber"}
          label={"Phone Number"}
          className={" col-span-2"}
          inputValue={customerDetail.phone}
          onChange={handleCustomerDetailChange}
        />{" "}
        <PhotoInput
          name={"avatar"}
          label={"Customer Image"}
          isOptional
          className="col-span-2"
          inputValue={customerDetail.avatar}
          //this need to be managed later
          onChange={handleCustomerDetailChange}
        />
        <Button
          className={
            "col-span-2 justify-self-center rounded-full px-10 text-lg"
          }
          value={"Submit"}
          Icon={IoMdCloudUpload}
          iconClass={"text-xl ml-2"}
          isTrailingIcon
          onClick={handleFormSubmit}
          isDisable={isPending}
        />
      </div>
    </form>
  )
}

export default CustomerCreate
