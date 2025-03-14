import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoMdCloudUpload } from "react-icons/io"
import FormFieldRow from "../Shared/FormFieldRow"
import PhotoInput from "../Shared/PhotoInput"
import Button from "../Shared/Button"
import { useCustomerCreate } from "../../customHooks/mutate"
import toast from "../../utils/toast"
const CustomerCreate = () => {
  const navigate = useNavigate()
  const [customerDetail, setCustomerDetail] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    customerImage: "",
  })
  const [inputImage, setInputImage] = useState(null)
  const { mutate: createCustomer, isPending } = useCustomerCreate()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const detail = { ...customerDetail, customerImage: inputImage }
    createCustomer(detail, {
      onSuccess: (data) => {
        navigate("/")
        toast(data.status, data.message)
      },
      onError: (err) => {
        console.log(err.message)
        toast("error", "Error creating customer")
      },
    })
  }
  const handleCustomerDetailChange = (e) => {
    const phoneRegex = /^\d{0,10}$/
    if (e.target.name === "phoneNumber" && !phoneRegex.test(e.target.value)) {
      return
    }
    setCustomerDetail({
      ...customerDetail,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mx-auto my-12 grid max-w-[700px] grid-cols-2 gap-10 px-4">
        <FormFieldRow
          name={"firstName"}
          label={"First Name"}
          className={"sm:col-span-2"}
          isRequired={true}
          inputValue={customerDetail.firstName}
          onChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"lastName"}
          label={"Last Name"}
          className={"sm:col-span-2"}
          isRequired={true}
          inputValue={customerDetail.lastName}
          onChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"phoneNumber"}
          label={"Phone Number"}
          className={" col-span-2"}
          isRequired={true}
          inputValue={customerDetail.phoneNumber}
          onChange={handleCustomerDetailChange}
        />{" "}
        <PhotoInput
          name={"customerImage"}
          label={"Customer Image"}
          isOptional
          className="col-span-2"
          setInputImage={setInputImage}
        />
        <Button
          submittable={true}
          className={
            "col-span-2 justify-self-center rounded-full px-10 text-lg"
          }
          value={!isPending ? "Submit" : "Submitting..."}
          Icon={!isPending ? IoMdCloudUpload : null}
          iconClass={"text-xl ml-2"}
          isTrailingIcon
          isDisable={isPending}
        />
      </div>
    </form>
  )
}

export default CustomerCreate
