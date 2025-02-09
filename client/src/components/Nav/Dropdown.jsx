import { FaSignOutAlt } from "react-icons/fa"
import { BiSolidUserCircle } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { IoMdAdd } from "react-icons/io"
import { FaEdit } from "react-icons/fa"
import { ImSpinner2 } from "react-icons/im"
import { useRef } from "react"
import { useAvatarUpload } from "../../customHooks/mutate"
import { addAvatar } from "../../store/VendorSlice"
import Avatar, { AvatarOverlay } from "../Shared/Avatar"
import showToast from "../../utils/toast"
const DropDown = ({ onClose, onClick, onLogout }) => {
  const dispatch = useDispatch()
  const { firstName, lastName, avatar } = useSelector((state) => state.vendor)
  const fileInputRef = useRef(null)
  const vendorName = `${firstName} ${lastName}`
  const { mutate: handleAvatarUpload, isPending } = useAvatarUpload()
  const handleFileChange = async (e) => {
    if (fileInputRef) {
      const avatar = e.target.files[0]
      if (!avatar) return
      //submit avatar to server
      handleAvatarUpload(avatar, {
        onSuccess: (data) => {
          dispatch(addAvatar(data.path))
          showToast("success", "image uploaded successfully")
        },
        onError: (err) => {
          showToast("error", err.message)
        },
      })
    }
  }
  const handleFileInputClick = (e) => {
    if (fileInputRef) {
      fileInputRef.current.click()
    }
  }
  return (
    <div
      onClick={onClick}
      className="dropdown text-textColor absolute -right-2 top-12 z-50 min-h-[200px] w-max min-w-[250px] rounded-lg bg-white p-6"
    >
      <div className="mb-4 flex cursor-pointer items-center rounded-md py-3">
        <Avatar className={"group"} onClick={handleFileInputClick}>
          {!avatar ? (
            <>
              <BiSolidUserCircle className="text-[2.25rem]"></BiSolidUserCircle>
              {!isPending ? (
                <AvatarOverlay className={"hidden group-hover:grid"}>
                  <IoMdAdd className="text-[1.5rem] text-black" />
                </AvatarOverlay>
              ) : (
                <AvatarOverlay>
                  <ImSpinner2 className="animate-spin text-[1.2rem] text-black" />
                </AvatarOverlay>
              )}
            </>
          ) : (
            <>
              <img
                src={`http://localhost:5000/uploads/${avatar}`}
                className="h-9 w-9 rounded-full"
                alt="Avatar"
              />
              {!isPending ? (
                <AvatarOverlay className={"hidden group-hover:grid"}>
                  <FaEdit className="text-[1.5rem]" />
                </AvatarOverlay>
              ) : (
                <AvatarOverlay>
                  <ImSpinner2 className="animate-spin text-[1.2rem] text-black" />
                </AvatarOverlay>
              )}
            </>
          )}
        </Avatar>
        <h3 className="text-lg font-bold">{vendorName}</h3>
      </div>
      <div
        onClick={onLogout}
        className="mb-4 flex cursor-pointer items-center rounded-md py-3 hover:border-b-2 hover:border-slate-300 hover:bg-gray-100"
      >
        <FaSignOutAlt className="mr-2 w-12 text-[1.8rem]" />
        <span className="text-lg font-bold">Log Out</span>
      </div>
      {/* Hidden input file for image selection */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
export default DropDown
