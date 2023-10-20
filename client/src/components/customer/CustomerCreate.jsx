import React from "react"
import FormFieldRow from "../Shared/FormFieldRow"
import PhotoInput from "../Shared/PhotoInput"
import { useNavigate } from "react-router-dom"
import Button from "../Shared/Button"
import { IoMdCloudUpload } from "react-icons/io"
const CustomerCreate = () => {
  const navigate = useNavigate()
  const id = 56 //this line is going to be updated when there is successful response of creation of customer from api with the response as id of the customer
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mx-auto my-12 grid max-w-[700px] grid-cols-2 gap-10 px-4">
        <FormFieldRow
          htmlFor={"firstName"}
          label={"First Name"}
          className={"sm:col-span-2"}
        />
        <FormFieldRow
          htmlFor={"lastName"}
          label={"Last Name"}
          className={"sm:col-span-2"}
        />
        <FormFieldRow
          htmlFor={"phone"}
          label={"Phone Number"}
          className={" col-span-2"}
          isOptional
        />{" "}
        <PhotoInput
          label={"Customer Image"}
          isOptional
          className="col-span-2"
        />
        <Button
          className={
            "col-span-2 justify-self-center rounded-full px-10 text-lg"
          }
          value={"Submit"}
          Icon={IoMdCloudUpload}
          iconClass={"text-xl ml-2"}
          isTrailingIcon
        />
      </div>
    </form>
  )
}

export default CustomerCreate
