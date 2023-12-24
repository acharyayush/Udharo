import React, { useEffect, useState } from "react"
import axios from "axios"
import TotalUdharoCard from "./TotalUdharoCard"
import UdharoList from "./UdharoList"
import SearchInput from "../../Shared/SearchInput"
import Button from "../../Shared/Button"
import { AiOutlinePlus } from "react-icons/ai"
import toast from "../../../utils/toast"
const BASEURL = "http://localhost:5000"
const UdharosMain = () => {
  //this should be removed
  const sampleVendorId = "65865d8b75a727705c869123"
  const [totalUdharo, setTotalUdharo] = useState(0)
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const handleScreenResize = () => {
    setScreenSize(window.innerWidth)
  }

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const { data } = await axios.get(
          `${BASEURL}/api/${sampleVendorId}/customers/`
        )
        setTotalUdharo(data.totalUdharo)
        setCustomers(data.customers)
        setFilteredCustomers(data.customers)
      } catch (err) {
        toast("error", `${err.message}`)
      }
    }
    fetchHomePageData()
  }, [])
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize)
    return () => {
      window.removeEventListener("resize", handleScreenResize)
    }
  })
  const filterByName = () => {
    const filtered = customers.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase())
    )
    setFilteredCustomers(filtered)
  }
  const sortByLastModified = () => {
    const sorted = [...customers].sort((a, b) => {
      return (
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      )
    })
    setFilteredCustomers(sorted)
  }
  const sortByAmountLeft = () => {
    const sorted = [...customers].sort((a, b) => {
      return b.amountLeft - a.amountLeft
    })
    setFilteredCustomers(sorted)
  }
  useEffect(() => {
    filterByName()
  }, [searchValue])
  useEffect(() => {
    sortByLastModified()
    // sortByAmountLeft()
  }, [])
  return (
    <div className="mx-auto min-h-screen w-[80%] sm:w-[90%]">
      <TotalUdharoCard totalUdharo={totalUdharo} />
      <div className="customers mt-16">
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
            value={screenSize > 639 && "Add Customer"}
            Icon={screenSize <= 639 && AiOutlinePlus}
            iconClass={"text-2xl m-0"}
            destination={"/createCustomer"}
          />
        </div>
        <h1 className="my-2 text-3xl font-bold text-brightGreen">Udharos</h1>
        <UdharoList screenSize={screenSize} customers={filteredCustomers} />
      </div>
    </div>
  )
}

export default UdharosMain
// '{"totalUdharos":12000,"customers":[{"id":1231,"name":"Ayush Acharya","lastModified":1213132132,"udharoLeft":1232}]}'
