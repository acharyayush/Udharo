import Skeleton from "react-loading-skeleton"

const TransactionCardSkeleton = ({ count = 1 }) => {
  return Array(count)
    .fill(0)
    .map((el, index) => {
      return (
        <div
          key={index}
          className="TransactionCardSkeleton mt-4 items-center rounded-md bg-white px-5 py-4 shadow-md"
        >
          <div className="w-full">
            <Skeleton className=" mb-1 h-4 w-1/2 sm:w-2/3" />
            <Skeleton className=" mb-1 h-5 w-2/3 sm:w-[90%]" />
            <Skeleton className=" h-5 w-1/3 sm:w-1/2" />
          </div>
        </div>
      )
    })
}

export default TransactionCardSkeleton
