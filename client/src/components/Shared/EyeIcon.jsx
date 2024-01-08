import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
const EyeIcon = ({ showPassword, toggleShowPassword }) => {
  return (
    <div
      className="eyeIcon text-textColor absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-xl md:text-2xl"
      onClick={() => toggleShowPassword((prevShowState) => !prevShowState)}
    >
      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
    </div>
  )
}

export default EyeIcon
