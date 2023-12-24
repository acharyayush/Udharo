import React, { useEffect, useState } from "react"
import { IoMdCloudUpload } from "react-icons/io"
import axios from "axios"
import FormFieldRow from "../Shared/FormFieldRow"
import PhotoInput from "../Shared/PhotoInput"
import { useNavigate } from "react-router-dom"
import Button from "../Shared/Button"
import toast from "../../utils/toast"
const CustomerCreate = () => {
  const navigate = useNavigate()
  const [customerDetail, setCustomerDetail] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avatar: "",
  })
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
  const handleFormSubmit = async (e) => {
    //validation starts

    //validation successfull
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/65865d8b75a727705c869123/customers/add`,
        customerDetail
      )
      navigate("/")
      toast("success", "New customer is created 😁")
    } catch (err) {
      toast("error", err.message)
    }
  }
  return (
    <form onSubmit={() => e.preventDefault()}>
      <div className="mx-auto my-12 grid max-w-[700px] grid-cols-2 gap-10 px-4">
        <FormFieldRow
          name={"firstName"}
          label={"First Name"}
          className={"sm:col-span-2"}
          inputValue={customerDetail.firstName}
          handleInputChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"lastName"}
          label={"Last Name"}
          className={"sm:col-span-2"}
          inputValue={customerDetail.lastName}
          handleInputChange={handleCustomerDetailChange}
        />
        <FormFieldRow
          name={"phoneNumber"}
          label={"Phone Number"}
          className={" col-span-2"}
          inputValue={customerDetail.phone}
          handleInputChange={handleCustomerDetailChange}
        />{" "}
        <PhotoInput
          name={"avatar"}
          label={"Customer Image"}
          isOptional
          className="col-span-2"
          inputValue={customerDetail.avatar}
          handleInputChange={handleCustomerDetailChange}
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
        />
      </div>
    </form>
  )
}

export default CustomerCreate
