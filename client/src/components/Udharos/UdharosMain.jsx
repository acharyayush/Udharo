import React, { useEffect, useState } from "react"
import TotalUdharoCard from "./TotalUdharoCard"
import UdharoList from "./UdharoList"
import SearchInput from "../Shared/SearchInput"
import Button from "../Shared/Button"
const UdharosMain = () => {
  const udharos = [
    {
      id: 1,
      customerName: "Pukule Bahadur Chhettri",
      lastModified: new Date("2018"),
      amountLeft: 8466,
    },
    {
      id: 2,
      customerName: "Bablu Yadav",
      lastModified: new Date("2015"),
      amountLeft: 5249,
    },
    {
      id: 3,
      customerName: "Bhosdi Wale Chacha",
      lastModified: new Date("2023"),
      amountLeft: 4562,
    },
    {
      id: 4,
      customerName: "John Doe",
      lastModified: new Date("2000"),
      amountLeft: 4646546,
    },
  ]
  const [filteredUdharos, setFilteredUdharos] = useState(udharos)
  const [searchValue, setSearchValue] = useState("")

  const filterByName = () => {
    const filtered = udharos.filter(({ customerName }) =>
      customerName.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredUdharos(filtered)
  }
  const sortByLastModified = () => {
    const sorted = [...udharos].sort((a, b) => {
      return b.lastModified.getTime() - a.lastModified.getTime()
    })
    setFilteredUdharos(sorted)
  }
  const sortByAmountLeft = () => {
    const sorted = [...udharos].sort((a, b) => {
      return b.amountLeft - a.amountLeft
    })
    setFilteredUdharos(sorted)
  }
  useEffect(() => {
    //sorting by name
    filterByName()
  }, [searchValue])
  useEffect(() => {
    sortByLastModified()
    // sortByAmountLeft()
  }, [])
  return (
    <div className="mx-auto min-h-screen w-[80%]">
      <TotalUdharoCard />
      <div className="udharos mb-8 mt-16 ">
        <div className="flex justify-end">
          <SearchInput
            className={"w-[300px] border-brightGreen py-[0.3rem] text-base"}
            iconClassName={"text-brightGreen"}
            value={searchValue}
            setSearchValue={setSearchValue}
          />
          <Button
            className={"ml-2 rounded-full"}
            value={"Add Udharo"}
            destination={"/createCustomer"}
          />
        </div>
        <h1 className="my-2 text-3xl font-bold text-brightGreen">Udharos</h1>
        <UdharoList udharos={filteredUdharos} />
      </div>
    </div>
  )
}

export default UdharosMain
