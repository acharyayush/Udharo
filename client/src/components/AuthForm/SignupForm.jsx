import { useState } from "react"
import Button from "../Shared/Button"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
import { handleSignup } from "../../apis/auth"
import showToast from "../../utils/toast"
import {
  addVendorInfo,
  resetVendorInfo,
  setLoggedIn,
} from "../../store/VendorSlice"
import { useDispatch } from "react-redux"
const SignupForm = ({ className }) => {
  const dispatch = useDispatch()
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  }
  const [userDetails, setUserDetails] = useState(initialState)
  const [isPending, setIsPending] = useState(false)
  const onSignUp = async (e) => {
    try {
      e.preventDefault()
      setIsPending(true)
      const data = await handleSignup(userDetails)
      setIsPending(false)
      dispatch(resetVendorInfo())
      dispatch(addVendorInfo(data))
      dispatch(setLoggedIn(true))
    } catch (err) {
      console.log(err)
      setIsPending(false)
      if (err.response) {
        showToast("error", err.response.data.message)
      } else {
        showToast("error", err.message)
      }
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  const handleUserDetailChange = (e) => {
    const phoneRegex = /^\d{0,10}$/
    if (e.target.name === "phone" && !phoneRegex.test(e.target.value)) {
      return
    }
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <form className={className} onSubmit={onSignUp}>
      <div className="name grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <FormFieldRow
            isRequired={true}
            inputType="text"
            placeholder="First name"
            name="firstName"
            id="firstName"
            inputClassName="py-2"
            inputValue={userDetails.firstName}
            onChange={handleUserDetailChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <FormFieldRow
            isRequired={true}
            inputType="text"
            placeholder="Last name"
            name="lastName"
            id="lastName"
            inputClassName="py-2"
            inputValue={userDetails.lastName}
            onChange={handleUserDetailChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <FormFieldRow
          isRequired={true}
          inputType="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          inputClassName="py-2"
          inputValue={userDetails.email}
          onChange={handleUserDetailChange}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <FormFieldRow
          isRequired={true}
          inputType="text"
          placeholder="Enter your Phone Number"
          name="phone"
          id="phone"
          inputClassName="py-2"
          inputValue={userDetails.phone}
          onChange={handleUserDetailChange}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <FormFieldRow
          isRequired={true}
          inputType={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          name="password"
          id="password"
          inputClassName="py-2"
          inputValue={userDetails.password}
          onChange={handleUserDetailChange}
        >
          <EyeIcon
            showPassword={showPassword}
            toggleShowPassword={setShowPassword}
          />
        </FormFieldRow>
      </div>

      <Button
        submittable={true}
        isDisable={isPending}
        value="Signup"
        className={`mb-5 w-full rounded-md border-2 py-1 text-center text-lg font-medium text-white duration-200 xsm:text-base ${
          !isPending
            ? "border-primary bg-primary"
            : "border-primary/70 bg-primary/70"
        }`}
      />
    </form>
  )
}
export default SignupForm
