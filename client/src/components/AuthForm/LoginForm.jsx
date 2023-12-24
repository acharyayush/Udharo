import React, { useState } from "react"
import Button from "../Shared/Button"
import { Link } from "react-router-dom"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
const LoginForm = ({ className, setFormType }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
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
      <FormFieldRow
        inputType={"email"}
        className={"mb-5 mt-4"}
        placeholder={"Enter your email"}
        name={"email"}
        inputClassName={"py-2"}
        inputValue={userDetails.email}
        handleInputChange={handleUserDetailChange}
      />
      <FormFieldRow
        inputType={showPassword ? "text" : "password"}
        placeholder={"Enter your password"}
        className={"mb-5"}
        name={"password"}
        inputClassName={"py-2"}
        inputValue={userDetails.password}
        handleInputChange={handleUserDetailChange}
      >
        <EyeIcon
          showPassword={showPassword}
          toggleShowPassword={setShowPassword}
        />
      </FormFieldRow>
      <Button
        value={"Login"}
        className={
          " mb-5 w-full rounded-md border-2 border-brightGreen py-1 text-center text-lg font-medium duration-200 hover:bg-transparent hover:text-brightGreen xsm:text-base"
        }
      />
      <p class="mb-6 text-center text-sm">
        <span> New Here? </span>
        <Link
          onClick={handleFormType}
          className=" font-medium text-brightGreen underline"
        >
          Signup now
        </Link>
      </p>
    </form>
  )
}
export default LoginForm
