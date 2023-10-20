import React from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { BiSolidUserCircle } from "react-icons/bi"
const DropDown = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="dropdown bg-white text-textColor absolute -right-2 top-12 z-50 min-h-[200px] w-max min-w-[250px] rounded-lg p-6"
    >
      <div className="border-slate-300 mb-4 flex cursor-default items-center border-b-2 py-3">
        <BiSolidUserCircle className="mr-2 w-12 text-[2.5rem]" />
        <h3 className="text-lg font-bold">Ayush Acharya</h3>
      </div>
      <div className="hover:border-slate-300 hover:bg-gray-100 mb-4 flex cursor-pointer items-center rounded-md py-3 hover:border-b-2">
        <FaSignOutAlt className="mr-2 w-12 text-[1.8rem]" />
        <h3 className="text-lg font-bold">Log Out</h3>
      </div>
    </div>
  )
}
export default DropDown
