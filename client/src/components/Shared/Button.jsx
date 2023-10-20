import React from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
const Button = ({
  className,
  destination,
  value,
  Icon,
  isTrailingIcon,
  iconClass,
  onClick,
}) => {
  const classes = twMerge(
    "inline-flex items-center bg-brightGreen text-white font-bold tracking-wide py-2 px-4 rounded text-base",
    className
  )
  iconClass = twMerge(`${isTrailingIcon ? "ml-1" : "mr-1"}`, iconClass)
  const renderBtnValue = () => {
    if (!Icon) return <span>{value}</span>
    if (!value)
      return <Icon className={twMerge("m-1 text-[1.05rem]", iconClass)} />
    if (!isTrailingIcon) {
      return (
        <>
          <Icon className={iconClass} />
          <span>{value}</span>
        </>
      )
    }
    return (
      <>
        <span>{value}</span>
        <Icon className={iconClass} />
      </>
    )
  }
  return (
    <Link className={classes} to={destination} onClick={onClick}>
      {renderBtnValue()}
    </Link>
  )
}

export default Button
