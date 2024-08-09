import React from "react"
import { Link } from "react-router-dom"

function SingleGroupRecord({
  _id,
  group,
  leader,
  expectedCount,
  actualCount,
  startTime,
  endTime,
}) {
  return (
    <Link
      to={`/dashboard/updategrouprecord/${_id}`}
      className='bg-white hover:bg-indigo-100 grid grid-cols-7 w-full hover:cursor-pointer relative'
    >
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm  border border-t-0'>
        {`Group ${group}`}
      </p>
      <p className='col-span-2 p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-l-0 border-t-0'>
        {leader}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-l-0 border-t-0'>
        {new Intl.NumberFormat().format(expectedCount)}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-l-0 border-t-0'>
        {new Intl.NumberFormat().format(actualCount)}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-l-0 border-t-0'>
        {`${startTime.hour}:${startTime.min} ${startTime.time}`}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-l-0 border-t-0'>
        {`${endTime.hour}:${endTime.min} ${endTime.time}`}
      </p>
    </Link>
  )
}

export default SingleGroupRecord
