import React from "react"

const MenuIcon = ({ handleClick, isMenuOpen, menuRef, onClick }) => {
  return (
    <div onClick={onClick} className=" hidden w-7 overflow-hidden md:block">
      <div
        className={`line mb-1 h-1 w-7 rounded-sm bg-textColor duration-700 ${
          isMenuOpen && "translate-y-2 rotate-45"
        }`}
      ></div>
      <div
        className={`line mb-1 h-1 w-7 rounded-sm bg-textColor duration-700 ${
          isMenuOpen && "translate-x-8"
        }`}
      ></div>
      <div
        className={`line h-1 w-7 rounded-sm bg-textColor duration-700 ${
          isMenuOpen && "-translate-y-2 -rotate-45"
        }`}
      ></div>
    </div>
  )
}

export default MenuIcon
