import React, { useState } from "react"
import Button from "../Shared/Button"
import { Link } from "react-router-dom"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
const SignupForm = ({ className, setFormType }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const handleUserDetailChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }
  const handleFormType = (e) => {
    e.preventDefault()
    setFormType("Signup")
  }
  return (
    <form action="/login" method="post" className={className}>
      <div className="name grid grid-cols-2 gap-4">
        <FormFieldRow
          inputType={"text"}
          className={"mb-4"}
          placeholder={"First name"}
          name={"firstName"}
          inputClassName={"py-2"}
          inputValue={userDetails.firstName}
          handleUserDetailChange={handleUserDetailChange}
        />
        <FormFieldRow
          inputType={"text"}
          className={"mb-4"}
          placeholder={"Last name"}
          name={"lastName"}
          inputClassName={"py-2"}
          inputValue={userDetails.lastName}
          handleUserDetailChange={handleUserDetailChange}
        />
      </div>
      <FormFieldRow
        inputType={"email"}
        className={"mb-4"}
        placeholder={"Enter your email"}
        name={"email"}
        inputClassName={"py-2"}
        inputValue={userDetails.email}
        handleUserDetailChange={handleUserDetailChange}
      />
      <FormFieldRow
        inputType={"text"}
        className={"mb-4"}
        placeholder={"Enter your Phone Number"}
        name={"phoneNumber"}
        inputClassName={"py-2"}
        inputValue={userDetails.phone}
        handleUserDetailChange={handleUserDetailChange}
      />
      <FormFieldRow
        inputType={showPassword ? "text" : "password"}
        placeholder={"Enter your password"}
        className={"mb-4"}
        name={"password"}
        inputClassName={"py-2"}
        inputValue={userDetails.password}
        handleUserDetailChange={handleUserDetailChange}
      >
        <EyeIcon
          showPassword={showPassword}
          toggleShowPassword={setShowPassword}
        />
      </FormFieldRow>
      <Button
        value={"Login"}
        className={
          " mb-4 w-full rounded-md border-2 border-brightGreen py-1 text-center text-lg font-medium duration-200 hover:bg-transparent hover:text-brightGreen xsm:text-base"
        }
      />
    </form>
  )
}
export default SignupForm
