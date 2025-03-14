import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"
const CustomLink = ({
  to,
  isDisable,
  className,
  onClick,
  children,
  submittable,
}) => {
  if (isDisable) {
    return <span className={twMerge(className, "opacity-75")}>{children}</span>
  }
  if (to)
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  if (submittable)
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    )
  return (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  )
}

const Button = ({
  className,
  destination,
  value,
  Icon,
  isTrailingIcon,
  iconClass,
  onClick,
  isDisable,
  submittable
}) => {
  const classes = twMerge(
    "inline-flex items-center bg-primary text-white font-bold tracking-wide py-2 px-4 rounded text-base cursor-pointer",
    className
  )
  iconClass = twMerge(`${isTrailingIcon ? "ml-1" : "mr-1"}`, iconClass)
  const renderBtnValue = () => {
    if (!Icon) return <span className="w-full whitespace-nowrap">{value}</span>
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
    <CustomLink
      className={classes}
      to={destination}
      onClick={onClick}
      isDisable={isDisable}
      submittable={submittable}
    >
      {renderBtnValue()}
    </CustomLink>
  )
}

export default Button
