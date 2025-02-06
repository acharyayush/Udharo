import { useState } from "react"
import Button from "../Shared/Button"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
import { handleSignup } from "../../apis/auth"
import showToast from "../../utils/toast"
import { addVendorInfo, setLoggedIn } from "../../store/VendorSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
const SignupForm = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  }
  const [userDetails, setUserDetails] = useState(initialState)
  const onSignUp = async () => {
    try {
      const data = await handleSignup(userDetails)
      dispatch(addVendorInfo(data))
      dispatch(setLoggedIn(true))
      navigate("/")
    } catch (err) {
      console.log(err)
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
    if (e.target.name === "phone" && !phoneRegex.test(e.target.value)){
      return;
    }
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <form action="/login" method="post" className={className}>
      <div className="name grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <FormFieldRow
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
        onClick={onSignUp}
        value="Signup"
        className="mb-4 w-full rounded-md border-2 border-brightGreen bg-brightGreen py-1 text-center text-lg font-medium text-white duration-200 hover:bg-green-500 xsm:text-base"
      />
    </form>
  )
}
export default SignupForm
