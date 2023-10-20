import React from "react"
import FormFieldRow from "../Shared/FormFieldRow"
import Button from "../Shared/Button"
const UdharoForm = ({ className }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={className}>
      <h1 className="text-center text-3xl font-bold uppercase text-brightGreen sm:text-2xl">
        Add a product
      </h1>
      <div className="mx-auto my-8 grid max-w-[700px] grid-cols-2 gap-10 px-4">
        <FormFieldRow
          htmlFor={"product"}
          label={"Product"}
          className={"col-span-2"}
          placeholder={"Ex: waiwai"}
        />
        <FormFieldRow
          htmlFor={"quantity"}
          label={"Quantity"}
          className={"sm:col-span-2"}
          placeholder={"Ex: 5"}
        />
        <FormFieldRow
          htmlFor={"unitPrice"}
          label={"Unit Price (NPR)"}
          className={"sm:col-span-2"}
          placeholder={"Ex: 20"}
        />
        <Button
          className={
            "col-span-2 justify-self-center rounded-full px-14 text-lg"
          }
          value={"Add"}
        />
      </div>
    </form>
  )
}

export default UdharoForm
