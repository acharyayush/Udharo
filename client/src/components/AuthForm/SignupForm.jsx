import { useState } from "react"
import Button from "../Shared/Button"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
const SignupForm = ({ className }) => {
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
          onChange={handleUserDetailChange}
        />
        <FormFieldRow
          inputType={"text"}
          className={"mb-4"}
          placeholder={"Last name"}
          name={"lastName"}
          inputClassName={"py-2"}
          inputValue={userDetails.lastName}
          onChange={handleUserDetailChange}
        />
      </div>
      <FormFieldRow
        inputType={"email"}
        className={"mb-4"}
        placeholder={"Enter your email"}
        name={"email"}
        inputClassName={"py-2"}
        inputValue={userDetails.email}
        onChange={handleUserDetailChange}
      />
      <FormFieldRow
        inputType={"text"}
        className={"mb-4"}
        placeholder={"Enter your Phone Number"}
        name={"phoneNumber"}
        inputClassName={"py-2"}
        inputValue={userDetails.phone}
        onChange={handleUserDetailChange}
      />
      <FormFieldRow
        inputType={showPassword ? "text" : "password"}
        placeholder={"Enter your password"}
        className={"mb-4"}
        name={"password"}
        inputClassName={"py-2"}
        inputValue={userDetails.password}
        onChange={handleUserDetailChange}
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
