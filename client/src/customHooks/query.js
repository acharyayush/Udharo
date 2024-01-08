import { useQuery } from "@tanstack/react-query"
import { getHomePageData, getTransactionHistory } from "../apis/customers"
import { getProductsAndUdharo } from "../apis/products"
const useHomeQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["homepage"],
    queryFn: () => getHomePageData(),
  })
  return { data, isLoading, isError }
}
const useTransactionHistory = (customerId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactionHistory", customerId],
    queryFn: () => getTransactionHistory(customerId),
  })
  return { data, isLoading, isError }
}
const useProductsAndUdharoQuery = (customerId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", customerId],
    queryFn: () => getProductsAndUdharo(customerId),
  })
  return { data, isLoading, isError }
}

export { useHomeQuery, useProductsAndUdharoQuery, useTransactionHistory }
