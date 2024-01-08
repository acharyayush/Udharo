import { useParams } from "react-router-dom"
import CustomerProfile from "../../Customer/CustomerProfile"
import UdharoTable from "./UdharoTable"
import TransactionList from "./TransactionList"
import UdharoSummary from "./UdharoSummary"
import { useProductsAndUdharoQuery } from "../../../customHooks/query"
const UdharoDisplay = () => {
  const { customerId } = useParams()
  const { data, isError } = useProductsAndUdharoQuery(customerId)
  if (isError) return
  return (
    <div className="mx-auto w-[90%]">
      <CustomerProfile
        name={data?.firstName && `${data?.firstName} ${data?.lastName}`}
        phoneNumber={data?.phoneNumber}
        udharoLeft={data?.udharoLeft}
      />
      <div className="mx-auto max-w-[823.75px]">
        <UdharoTable readonly products={data?.products} />
        <UdharoSummary
          grandTotal={data?.grandTotal}
          udharoLeft={data?.udharoLeft}
          udharoPaid={data?.udharoPaid}
        />
      </div>
      <TransactionList />
    </div>
  )
}

export default UdharoDisplay
