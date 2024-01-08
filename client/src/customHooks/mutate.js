import { useMutation } from "@tanstack/react-query"
import { createCustomer, deleteCustomer, payUdharo } from "../apis/customers"
import { addProduct, deleteProduct } from "../apis/products"
const useCustomerCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createCustomer,
  })
  return { mutate, isPending }
}
const useCustomerDelete = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCustomer,
  })
  return { mutate, isPending }
}
const useProductAdd = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
  })
  return { mutate, isPending }
}
const useProductDelete = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
  })
  return { mutate, isPending }
}
const useUdharoPay = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: payUdharo,
  })
  return { mutate, isPending }
}
export {
  useCustomerCreate,
  useProductAdd,
  useProductDelete,
  useCustomerDelete,
  useUdharoPay,
}
