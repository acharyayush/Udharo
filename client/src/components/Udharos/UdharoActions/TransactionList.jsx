import { useParams } from "react-router-dom"
import TransactionCard from "./TransactionCard"
import TransactionCardSkeleton from "../../Skeletons/TransactionCardSkeleton"
import { useTransactionHistory } from "../../../customHooks/query"
import { useSelector } from "react-redux"
const TransactionList = () => {
  const { customerId } = useParams()
  const {id:vendorId} = useSelector(state=>state.vendor)
  const { data } = useTransactionHistory(vendorId, customerId)
  const renderTransactionList = () => {
    return data?.map(({ remark, action, amount, date }, index) => {
      return (
        <TransactionCard
          remark={remark}
          action={action}
          amount={amount}
          date={date}
          key={index}
        />
      )
    })
  }
  return (
    <div className="TransactionList mx-auto max-w-[740px]">
      <h1 className="mb-4 mt-14 text-left text-2xl font-bold uppercase text-primary sm:text-2xl">
        Transaction History
      </h1>
      {!data && <TransactionCardSkeleton count={5} />}
      {data?.length === 0 && (
        <h1 className="mt-2 text-lg">No transaction History</h1>
      )}
      {data && renderTransactionList()}
    </div>
  )
}
export default TransactionList
