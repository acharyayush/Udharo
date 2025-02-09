import { useState, useEffect } from "react"
import { BiSolidUserCircle } from "react-icons/bi"
import { MdArrowDropDownCircle } from "react-icons/md"
import DropDown from "./DropDown"
import { twMerge } from "tailwind-merge"
import { handleLogout } from "../../apis/auth"
import { useNavigate } from "react-router-dom"
import showToast from "../../utils/toast"
import { setLoggedIn } from "../../store/VendorSlice"
import { useDispatch, useSelector } from "react-redux"
const Profile = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { avatar } = useSelector((state) => state.vendor)
  useEffect(() => {
    document.body.addEventListener("click", () => setIsOpen(false))
    return () => {
      document.body.removeEventListener("click", closeDropDown)
    }
  }, [])
  const closeDropDown = () => {
    setIsOpen(false)
  }
  const toggleDropDown = (e) => {
    setIsOpen((isOpen) => !isOpen)
    e.stopPropagation()
  }
  const onLogout = async () => {
    try {
      await handleLogout()
      dispatch(setLoggedIn(false))
      closeDropDown()
      navigate("/auth")
      showToast("success", "Logged out successfully")
    } catch (err) {
      showToast("error", "Error logging out")
    }
  }
  const stayAsItIs = (e) => {
    e.stopPropagation()
  }
  return (
    <div
      className={twMerge(
        "Profile relative grid cursor-pointer place-content-center",
        className
      )}
    >
      <div className="myProfile" onClick={toggleDropDown}>
        {!avatar ? (
          <>
            <BiSolidUserCircle className=" text-[2.9rem] text-[#003a1f]"></BiSolidUserCircle>
            <MdArrowDropDownCircle className="absolute bottom-1 right-1 rounded-full bg-black text-base text-white" />
          </>
        ) : (
          <>
            <img
              src={`http://localhost:5000/uploads/${avatar}`}
              className="h-10 w-10 rounded-full"
              alt="Avatar"
            />
            <MdArrowDropDownCircle className="absolute bottom-0 right-0 rounded-full bg-black text-base text-white" />
          </>
        )}
      </div>
      {isOpen && (
        <DropDown
          onClose={closeDropDown}
          onLogout={onLogout}
          onClick={stayAsItIs}
        />
      )}
    </div>
  )
}

export default Profile
