import UdharoCard from "./UdharoCard"
import UdharoCardSkeleton from "../../Skeletons/UdharoCardSkeleton"
import { Link } from "react-router-dom"
const UdharoList = ({ customers, screenSize, isSearching }) => {
  if (!customers) return <UdharoCardSkeleton count={5} />
  if (customers.length === 0 && !isSearching)
    return (
      <h1 className="mt-2 text-lg">
        Currently, there are no customers with udharo.{" "}
        <Link to="/customers/add" className="font-bold text-brightGreen">
          Add
        </Link>{" "}
        customers to your udharo list!
      </h1>
    )
  if (isSearching)
    return <h1 className="mt-2 text-lg">No customers match your search!</h1>
  return customers.map(
    ({ _id, avatar, firstName, lastName, lastModified, udharoLeft }) => (
      <UdharoCard
        customerId={_id}
        avatar={avatar}
        customerName={`${firstName} ${lastName}`}
        lastModified={lastModified}
        udharoLeft={udharoLeft}
        screenSize={screenSize}
        key={_id}
      />
    )
  )
}

export default UdharoList
