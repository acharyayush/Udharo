import { useState } from "react"
import Button from "../Shared/Button"
import { Link, useNavigate } from "react-router-dom"
import EyeIcon from "../Shared/EyeIcon"
import FormFieldRow from "../Shared/FormFieldRow"
import { handleLogin } from "../../apis/auth"
import { addVendorInfo } from "../../store/VendorSlice"
import { useDispatch } from "react-redux"
import showToast from "../../utils/toast"
const LoginForm = ({ className, setFormType }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const onLogin = async () => {
    try {
      const data = await handleLogin(userDetails)
      dispatch(addVendorInfo(data))
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
  return (
    <form action="/login" method="post" className={className}>
      <div className="mb-5 mt-4">
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

      <div className="mb-5">
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
        onClick={onLogin}
        value="Login"
        className="mb-5 w-full rounded-md border-2 border-brightGreen bg-brightGreen py-1 text-center text-lg font-medium text-white duration-200 hover:bg-green-500  xsm:text-base"
      />

      <p className="mb-6 text-center text-sm">
        <span>New Here?</span>
        <Link
          onClick={handleFormType}
          className="font-medium text-brightGreen underline"
        >
          {" "}
          Signup now
        </Link>
      </p>
    </form>
  )
}
export default LoginForm
