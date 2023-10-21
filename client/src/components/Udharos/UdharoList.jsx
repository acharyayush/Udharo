import React from "react"
import UdharoCard from "./UdharoCard"

const UdharoList = ({ udharos, screenSize }) => {
  return udharos.map(
    ({ id, customerImg, customerName, lastModified, amountLeft }) => (
      <UdharoCard
        id={id}
        customerImg={customerImg}
        customerName={customerName}
        lastModified={lastModified}
        amountLeft={amountLeft}
        screenSize={screenSize}
        key={id}
      />
    )
  )
}

export default UdharoList
