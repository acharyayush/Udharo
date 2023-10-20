import React from "react"
import UdharoCard from "./UdharoCard"

const UdharoList = ({ udharos }) => {
  return udharos.map(
    ({ id, customerImg, customerName, lastModified, amountLeft }) => (
      <UdharoCard
        id={id}
        customerImg={customerImg}
        customerName={customerName}
        lastModified={lastModified}
        amountLeft={amountLeft}
        key={id}
      />
    )
  )
}

export default UdharoList
