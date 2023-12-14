import React, { useRef } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"
import Button from "./Button"
const Modal = ({
  isOpen,
  closeModal,
  onSubmit,
  submitVal,
  className,
  submitClass,
  children,
}) => {
  const nodeRef = useRef(null)
  return createPortal(
    isOpen && (
      <div
        ref={nodeRef}
        className={"Modal fixed left-0 top-0 h-screen w-screen text-gray-900"}
      >
        <div className="modalOverlay  absolute left-0 top-0 h-full w-full bg-black opacity-80"></div>
        <div
          className={twMerge(
            " modalContainer absolute left-1/2 top-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-bgColor px-4 py-8 sm:w-[300px] xsm:w-[250px] xsm:py-6",
            className
          )}
        >
          {children}
          <div className="btns my-4 text-center">
            <Button
              className=" cancelBtn rounded-md border-2  border-gray-900 bg-transparent px-5 py-[7px] font-medium text-gray-900 duration-200 hover:bg-gray-900 hover:text-white sm:text-sm"
              onClick={() => {
                closeModal()
              }}
              value={"Cancel"}
            />
            {submitVal && (
              <Button
                className={twMerge(
                  "submitBtn ml-3 rounded-md border-2 border-red-500 bg-red-500 px-5 py-[7px] font-medium duration-200 hover:border-red-500 hover:bg-red-600 sm:text-sm",
                  submitClass
                )}
                value={submitVal}
              />
            )}
          </div>
        </div>
      </div>
    ),
    document.body
  )
}

export default Modal
