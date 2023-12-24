import React from "react"
import UdharoCard from "./UdharoCard"

const UdharoList = ({ customers, screenSize }) => {
  return customers.map(
    ({ _id, avatar, firstName, lastName, lastModified, udharoLeft }) => (
      <UdharoCard
        id={_id}
        avatar={avatar}
        customerName={`${firstName} ${lastName}`}
        lastModified={lastModified}
        udharoLeft={udharoLeft}
        screenSize={screenSize}
        key={_id}
      />
    )
  )
}

export default UdharoList
