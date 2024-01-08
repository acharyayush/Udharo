import Skeleton from "react-loading-skeleton"

const UdharoCardSkeleton = ({ count = 1 }) => {
  return Array(count)
    .fill(0)
    .map((el, index) => {
      return (
        <div
          key={index}
          className="UdharoCardSkeleton mt-4 flex rounded-xl border-2 px-5 pb-5 pt-4 shadow-md sm:min-w-fit sm:flex-col sm:text-center"
        >
          <div>
            <Skeleton circle className="h-20 w-20 sm:mb-2" />
          </div>
          <div className="ml-7 w-full sm:ml-0">
            <Skeleton className=" mb-1 h-5 w-2/3 sm:w-[80%]" />
            <Skeleton className=" mb-1 h-4 w-1/2 sm:w-[60%]" />
            <Skeleton className=" h-6 w-1/3 sm:w-[40%]" />
          </div>
        </div>
      )
    })
}

export default UdharoCardSkeleton
