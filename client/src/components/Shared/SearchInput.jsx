import { twMerge } from "tailwind-merge"
import { FaSearch } from "react-icons/fa"
const SearchInput = ({
  className,
  inputClassName,
  iconClassName,
  searchValue,
  setSearchValue,
}) => {
  return (
    <div
      className={twMerge(
        "search text-textColor relative h-fit w-fit",
        className
      )}
    >
      <input
        type="text"
        placeholder="Search by Name"
        className={twMerge(
          "border-textColor placeholder:text-textColor rounded-3xl border-2 py-1 pl-4 pr-8 text-[0.9rem] outline-none",
          inputClassName
        )}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FaSearch
        className={twMerge(
          "absolute right-3 top-1/2 -translate-y-1/2 text-base ",
          iconClassName
        )}
      />
    </div>
  )
}

export default SearchInput
