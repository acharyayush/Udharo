import { useParams } from "react-router-dom"
import CustomerProfile from "../../Customer/CustomerProfile"
import UdharoSummary from "./UdharoSummary"
import UdharoPay from "./UdharoPay"
import UdharoTable from "./UdharoTable"
import UdharoAddForm from "./UdharoAddForm"
import { useProductsAndUdharoQuery } from "../../../customHooks/query"
const UdharoEdit = () => {
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
        <UdharoTable className={"pt-4"} products={data?.products} />
        <div className="flex justify-between sm:flex-col-reverse">
          <UdharoPay />
          <UdharoSummary
            grandTotal={data?.grandTotal}
            udharoLeft={data?.udharoLeft}
            udharoPaid={data?.udharoPaid}
          />
        </div>
        {data && <UdharoAddForm className={"mt-10 w-full"} />}
      </div>
    </div>
  )
}

export default UdharoEdit
