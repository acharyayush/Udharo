const filterByName = (customers, searchValue) => {
  if (!customers) return
  return customers.filter(({ firstName, lastName }) =>
    `${firstName} ${lastName}`
      ?.toLowerCase()
      .includes(searchValue?.toLowerCase())
  )
}
//latest modified udharo comes first
const sortByLastModified = (customers) => {
  if (!customers) return
  return customers.sort((a, b) => {
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    )
  })
}
//descending order
const sortByAmountLeft = (customers) => {
  if (!customers) return
  return [...customers].sort((a, b) => {
    return b.amountLeft - a.amountLeft
  })
}
export default { filterByName, sortByAmountLeft, sortByLastModified }
