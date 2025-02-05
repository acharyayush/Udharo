import { useQuery } from "@tanstack/react-query"
import { getHomePageData, getTransactionHistory } from "../apis/customers"
import { getProductsAndUdharo } from "../apis/products"
const useHomeQuery = (vendorId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["homepage"],
    queryFn: () => getHomePageData(vendorId),
    enabled: !!vendorId,
  })
  return { data, isLoading, isError }
}
const useTransactionHistory = (vendorId, customerId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactionHistory", customerId],
    queryFn: () => getTransactionHistory(vendorId, customerId),
    enabled: !!vendorId && !!customerId,
  })
  return { data, isLoading, isError }
}
const useProductsAndUdharoQuery = (vendorId, customerId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", customerId],
    queryFn: () => getProductsAndUdharo(vendorId, customerId),
    enabled: !!vendorId && !!customerId,
  })
  return { data, isLoading, isError }
}

export { useHomeQuery, useProductsAndUdharoQuery, useTransactionHistory }
