import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import Button from "../../Shared/Button"
import FormFieldRow from "../../Shared/FormFieldRow"
import { useUdharoPay } from "../../../customHooks/mutate"
import toast from "../../../utils/toast"
import { useSelector } from "react-redux"
const UdharoPay = () => {
  const queryClient = useQueryClient()
  const { customerId } = useParams()
  const {id:vendorId} = useSelector(state=>state.vendor)
  const [amount, setAmount] = useState("")
  const { mutate: payUdharo, isPending } = useUdharoPay()
  const handleAmountChange = (e) => {
    //only take digits but can include dot (.) too
    e.target.value = e.target.value.replace(/[^\d.]/g, "")
    setAmount(e.target.value)
  }
  const handleUdharoPaySubmit = (e) => {
    e.preventDefault()
    if (amount <= 0)
      return toast("error", "Repay amount must be greater than 0")
    payUdharo(
      { vendorId, customerId, amount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["products", customerId])
          setAmount("")
          toast(data.status, data.message)
        },
        onError: () => toast("error", "Unable to pay udharo"),
      }
    )
  }
  return (
    <div className="my-7 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row">
      <FormFieldRow
        placeholder={"Enter returned amount"}
        inputValue={amount}
        onChange={handleAmountChange}
        inputClassName={"p-2"}
        className={"sm:w-fit"}
      />
      <Button
        className={"mt-2 w-fit sm:ml-1 sm:mt-0"}
        value={"Repay"}
        onClick={handleUdharoPaySubmit}
        isDisable={isPending}
      />
    </div>
  )
}

export default UdharoPay
