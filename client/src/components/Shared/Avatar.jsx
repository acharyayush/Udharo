import React from "react"
import { twMerge } from "tailwind-merge"
export function AvatarOverlay({ children, className }) {
  return (
    <div
      className={twMerge(
        "overlay absolute left-0 top-0 z-20 grid h-full w-full place-content-center bg-[#ffffffbd]",
        className
      )}
    >
      {children}
    </div>
  )
}
function Avatar({ onClick, children, className }) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "avatar group relative mr-2 grid h-9 w-12 place-content-center",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Avatar
