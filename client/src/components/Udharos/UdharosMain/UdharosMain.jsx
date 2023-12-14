import React, { useEffect, useState } from "react"
import TotalUdharoCard from "./TotalUdharoCard"
import UdharoList from "./UdharoList"
import SearchInput from "../../Shared/SearchInput"
import Button from "../../Shared/Button"
import { AiOutlinePlus } from "react-icons/ai"
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
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const handleScreenResize = () => {
    setScreenSize(window.innerWidth)
  }
  const [filteredUdharos, setFilteredUdharos] = useState(udharos)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize)
    return () => {
      window.removeEventListener("resize", handleScreenResize)
    }
  })
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
    <div className="mx-auto min-h-screen w-[80%] sm:w-[90%]">
      <TotalUdharoCard />
      <div className="udharos mt-16">
        <div className="flex justify-end sm:mb-4">
          <SearchInput
            className={"sm:self-end"}
            inputClassName={
              "w-[300px] xsm:w-[210px] sm:w-[250px] border-brightGreen py-[0.3rem] text-base sm:text-sm"
            }
            iconClassName={"text-brightGreen"}
            value={searchValue}
            setSearchValue={setSearchValue}
          />
          <Button
            className={"ml-2 w-fit rounded-full sm:px-1.5 sm:py-1"}
            value={screenSize > 639 && "Add Udharo"}
            Icon={screenSize <= 639 && AiOutlinePlus}
            iconClass={"text-2xl m-0"}
            destination={"/createCustomer"}
          />
        </div>
        <h1 className="my-2 text-3xl font-bold text-brightGreen">Udharos</h1>
        <UdharoList screenSize={screenSize} udharos={filteredUdharos} />
      </div>
    </div>
  )
}

export default UdharosMain
