import { useState } from "react"
import Button from "../Shared/Button"
import { Link } from "react-router-dom"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
import { handleLogin } from "../../apis/auth"
import {
  addVendorInfo,
  resetVendorInfo,
  setLoggedIn,
} from "../../store/VendorSlice"
import { useDispatch } from "react-redux"
import showToast from "../../utils/toast"
const LoginForm = ({ className, setFormType }) => {
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
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
  const onLogin = async (e) => {
    try {
      e.preventDefault()
      setIsPending(true)
      const data = await handleLogin(userDetails)
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
  return (
    <form className={className} onSubmit={onLogin}>
      <div className="mb-5 mt-4">
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

      <div className="mb-5">
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
        value="Login"
        className={`mb-5 w-full rounded-md border-2 py-1 text-center text-lg font-medium text-white duration-200 xsm:text-base ${
          !isPending
            ? "border-primary bg-primary"
            : "border-primary/70 bg-primary/70"
        }`}
      />

      <p className="mb-6 text-center text-sm">
        <span>New Here?</span>
        <Link
          onClick={handleFormType}
          className="font-medium text-primary underline"
        >
          {" "}
          Signup now
        </Link>
      </p>
    </form>
  )
}
export default LoginForm
