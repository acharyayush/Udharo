import { useState, useEffect } from "react"
import { BiSolidUserCircle, BiSolidCaretDownCircle } from "react-icons/bi"
import DropDown from "./DropDown"
import { twMerge } from "tailwind-merge"
import { handleLogout } from "../../apis/auth"
import { useNavigate } from "react-router-dom"
import showToast from "../../utils/toast"
import { setLoggedIn } from "../../store/VendorSlice"
import { useDispatch } from "react-redux"
const Profile = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        <BiSolidUserCircle className=" text-[2.5rem] text-[#003a1f]" />
        <BiSolidCaretDownCircle className="bg-textColor absolute bottom-1 right-1 rounded-full text-base text-white" />
      </div>
      {isOpen && <DropDown onClose={closeDropDown} onLogout={onLogout} onClick={stayAsItIs} />}
    </div>
  )
}

export default Profile
