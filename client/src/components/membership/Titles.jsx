import React from "react"

function Titles({ titleBtns, filterByTitle }) {
  return (
    <div className='flex justify-center items-center space-x-3 mb-3 mt-3 text-xs md:text-base'>
      <span className='font-semibold'>Filter By: </span>

      <select
        className='border-none rounded p-1 outline-0'
        onChange={filterByTitle}
      >
        {titleBtns.map((btn) => {
          return (
            <option key={btn} value={btn}>
              {btn}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Titles
