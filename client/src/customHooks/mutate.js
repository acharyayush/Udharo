import { useMutation } from "@tanstack/react-query"
import { createCustomer, deleteCustomer, payUdharo, uploadCustomerImage } from "../apis/customers"
import { addProduct, deleteProduct } from "../apis/products"
import { uploadAvatar } from "../apis/vendors"
const useCustomerCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createCustomer,
  })
  return { mutate, isPending }
}
const useCustomerImageUpload = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadCustomerImage,
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
const useAvatarUpload = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadAvatar,
  })
  return { mutate, isPending }
}
export {
  useCustomerCreate,
  useProductAdd,
  useProductDelete,
  useCustomerDelete,
  useUdharoPay,
  useAvatarUpload,
  useCustomerImageUpload
}
