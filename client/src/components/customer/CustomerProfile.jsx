import React from "react"
import { BiSolidUserCircle } from "react-icons/bi"
const CustomerProfile = ({ name, phoneNumber, imgUrl, udharoLeft }) => {
  const showImg = () => {
    return imgUrl ? (
      <img
        src={imgUrl}
        alt=""
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-[30px] rounded-full object-cover sm:h-32 sm:w-32"
      />
    ) : (
      <BiSolidUserCircle className=" absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-[30px] rounded-full sm:h-32 sm:w-32" />
    )
  }
  return (
    <div>
      <section className="CustomerProfileSection 0 mx-auto my-16 max-w-[900px] rounded-lg pb-6 text-gray-900 shadow-lg">
        <div className="customerImg relative m-auto h-24 w-full rounded-md bg-brightGreen">
          {showImg()}
        </div>
        <div className="customerProfileDetail mx-auto mb-6 mt-24 w-4/5 text-center sm:mt-14">
          <h3 className="mb-1 text-2xl font-bold">{name}</h3>
          {phoneNumber && (
            <h1 className="text-md mb-2 font-bold sm:text-base">
              {phoneNumber}
            </h1>
          )}
          <h1 className="text-2xl font-bold text-red-500  sm:text-xl">
            {"NPR. "}
            {udharoLeft.toLocaleString("en-NP", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </h1>
        </div>
      </section>
    </div>
  )
}

export default CustomerProfile
