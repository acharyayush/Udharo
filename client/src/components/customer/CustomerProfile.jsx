import { BiSolidUserCircle } from "react-icons/bi"
import Skeleton from "react-loading-skeleton"
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
        <div
          className={`customerImg relative m-auto h-24 w-full rounded-md ${
            name && "bg-brightGreen"
          }`}
        >
          {name ? (
            showImg()
          ) : (
            <Skeleton
              circle
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-[30px] rounded-full object-cover sm:h-32 sm:w-32"
            />
          )}
        </div>
        <div className="customerProfileDetail mx-auto mb-6 mt-24 w-4/5 text-center sm:mt-14">
          <h3 className="mb-1 text-2xl font-bold">
            {name || <Skeleton className="w-2/3 sm:w-[90%]" />}
          </h3>
          <h1 className="text-md mb-2 font-bold sm:text-base">
            {phoneNumber || <Skeleton className="h-5 w-1/2 sm:w-[80%]" />}
          </h1>
          <h1 className="text-2xl font-bold text-red-500  sm:text-xl">
            {udharoLeft != null ? (
              <>
                {"NPR. "}
                {udharoLeft?.toLocaleString("en-NP", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </>
            ) : (
              <Skeleton className="h-8 w-1/3 sm:w-1/2" />
            )}
          </h1>
        </div>
      </section>
    </div>
  )
}

export default CustomerProfile
