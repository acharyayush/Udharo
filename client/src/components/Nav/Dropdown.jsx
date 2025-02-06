import { FaSignOutAlt } from "react-icons/fa"
import { BiSolidUserCircle } from "react-icons/bi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const DropDown = ({onClose, onClick, onLogout }) => {
  const {firstName, lastName, email, avatar} = useSelector(state=>state.vendor)
  const vendorName = `${firstName} ${lastName}`
  return (
    <div
      onClick={onClick}
      className="dropdown text-textColor absolute -right-2 top-12 z-50 min-h-[200px] w-max min-w-[250px] rounded-lg bg-white p-6"
    >
      <Link to={"/"} onClick={onClose} className=" mb-4 flex cursor-pointer items-center border-b-2 border-slate-300 py-3">
        <BiSolidUserCircle className="mr-2 w-12 text-[2.5rem]" />
        <h3 className="text-lg font-bold">{vendorName}</h3>
      </Link>
      <div onClick={onLogout} className="mb-4 flex cursor-pointer items-center rounded-md py-3 hover:border-b-2 hover:border-slate-300 hover:bg-gray-100">
        <FaSignOutAlt className="mr-2 w-12 text-[1.8rem]" />
        <span className="text-lg font-bold">Log Out</span>
      </div>
    </div>
  )
}
export default DropDown
