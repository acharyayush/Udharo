import React, { useState, useEffect } from "react"
import { BiSolidUserCircle, BiSolidCaretDownCircle } from "react-icons/bi"
import DropDown from "./DropDown"
import { twMerge } from "tailwind-merge"
const Profile = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

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
        <BiSolidCaretDownCircle className="bg-textColor text-white absolute bottom-1 right-1 rounded-full text-base" />
      </div>
      {isOpen && <DropDown onClick={stayAsItIs} />}
    </div>
  )
}

export default Profile
