import { twMerge } from "tailwind-merge"

const FormFieldRow = ({
  name,
  label,
  inputType,
  placeholder,
  className,
  inputClassName,
  inputValue,
  onChange,
  isOptional,
  isRequired
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-base font-medium text-gray-900 sm:text-sm"
      >
        {label} {isOptional && "(optional)"}
      </label>
      <div>
        <input
          type={inputType || "text"}
          name={name}
          required = {isRequired}
          className={twMerge(
            "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6",
            inputClassName
          )}
          value={inputValue}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default FormFieldRow
