import { useEffect, useState } from "react"
import filter from "../../../utils/filter"
import TotalUdharoCard from "./TotalUdharoCard"
import UdharoList from "./UdharoList"
import SearchInput from "../../Shared/SearchInput"
import Button from "../../Shared/Button"
import { AiOutlinePlus } from "react-icons/ai"
import { useQueryClient } from "@tanstack/react-query"
import { useHomeQuery } from "../../../customHooks/query"
import { useSelector } from "react-redux"
const UdharosMain = () => {
  let initialFilteredCustomer
  const [searchValue, setSearchValue] = useState("")
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const {id:vendorId} = useSelector((state)=>state.vendor)
  const queryClient = useQueryClient()
  const { data, isError } = useHomeQuery(vendorId)

  //if there has not been searching involved yet, then make customers filter by last modified
  if (!data?.filteredCustomer) {
    initialFilteredCustomer = filter.sortByLastModified(data?.customers)
  }
  useEffect(() => {
    const filteredData = filter.filterByName(data?.customers, searchValue)
    queryClient.setQueryData(["homepage"], (prevData) => {
      return { ...prevData, filteredCustomer: filteredData }
    })
  }, [searchValue])

  //handle resizing of screen (making responsive)
  const handleScreenResize = () => {
    setScreenSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize)
    return () => {
      window.removeEventListener("resize", handleScreenResize)
    }
  }, [])

  if (isError) return
  return (
    <div className="mx-auto min-h-screen w-[80%] sm:w-[90%]">
      <TotalUdharoCard totalUdharo={data?.totalUdharo} />
      <div className="customers mt-16">
        {data?.customers && (
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
              destination={"/customers/add"}
            />
          </div>
        )}
        <h1 className="my-2 text-3xl font-bold text-brightGreen">Udharos</h1>
        <UdharoList
          screenSize={screenSize}
          customers={data?.filteredCustomer ?? initialFilteredCustomer}
          isSearching={!!searchValue}
        />
      </div>
    </div>
  )
}

export default UdharosMain
// '{"totalUdharos":12000,"customers":[{"id":1231,"name":"Ayush Acharya","lastModified":1213132132,"udharoLeft":1232}]}'
