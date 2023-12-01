import React from "react"

const FormSelect = ({ name, defaultValue = "", list, labelText }) => {
  return (
    <div className='w-full mb-2 mt-2'>
      <label htmlFor={name} className='capitalize block'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className='border border-blue-200 w-full rounded p-[10px] mt-1 outline-0'
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormSelect
