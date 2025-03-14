import { useState } from "react"
import FormFieldRow from "../../Shared/FormFieldRow"
import Button from "../../Shared/Button"
import { useParams } from "react-router-dom"
import { useProductAdd } from "../../../customHooks/mutate"
import { useQueryClient } from "@tanstack/react-query"
import toast from "../../../utils/toast"
const UdharoAddForm = ({ className }) => {
  const { customerId } = useParams()
  const queryClient = useQueryClient()
  const initialProductDetail = {
    name: "",
    quantity: "",
    unitPrice: "",
  }
  const [productDetail, setProductDetail] = useState(initialProductDetail)
  const { mutate: addProduct, isPending } = useProductAdd()
  const handleProductDetailChange = (e) => {
    if (e.target.name === "quantity" || e.target.name === "unitPrice") {
      //only take digits but can include dot (.) too
      e.target.value = e.target.value.replace(/[^\d.]/g, "")
    }
    setProductDetail({
      ...productDetail,
      [e.target.name]: e.target.value,
    })
  }
  const handleProductAdd = (e) => {
    e.preventDefault()
    const detail = {
      ...productDetail,
      customerId,
    }
    addProduct(detail, {
      onSuccess: (data) => {
        setProductDetail(initialProductDetail)
        queryClient.invalidateQueries(["products", customerId])
        toast(data.status, data.message)
      },
      onError: () => {
        toast("error", "Unable to add product 😕")
      },
    })
  }
  return (
    <form onSubmit={handleProductAdd} className={className}>
      <h1 className="text-left text-3xl font-bold uppercase text-primary sm:text-2xl">
        Add a product
      </h1>
      <div className="mx-auto my-8 grid max-w-full grid-cols-2 gap-10 xsm:px-0">
        <FormFieldRow
          isRequired={true}
          name={"name"}
          label={"Product"}
          className={"col-span-2"}
          placeholder={"Ex: waiwai"}
          inputValue={productDetail.name}
          onChange={handleProductDetailChange}
          inputClassName={"mt-1"}
        />
        <FormFieldRow
          isRequired={true}
          name={"quantity"}
          label={"Quantity"}
          className={"sm:col-span-2"}
          placeholder={"Ex: 5"}
          inputValue={productDetail.quantity}
          onChange={handleProductDetailChange}
          inputClassName={"mt-1"}
        />
        <FormFieldRow
          isRequired={true}
          name={"unitPrice"}
          label={"Unit Price (NPR)"}
          className={"sm:col-span-2"}
          placeholder={"Ex: 20"}
          inputValue={productDetail.unitPrice}
          onChange={handleProductDetailChange}
          inputClassName={"mt-1"}
        />
        <Button
          submittable={true}
          className={
            "col-span-2 justify-self-center rounded-full px-14 text-lg"
          }
          value={!isPending ? "Add" : "Adding..."}
          isDisable={isPending}
        />
      </div>
    </form>
  )
}

export default UdharoAddForm
