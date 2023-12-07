import React from "react"
import { useRcsCountsContext } from "../../pages/count/RcsCounts"
import { TableHead, TableData, TableRow } from "../TableContents"
import CountTotals from "./CountTotals"
import RcCountsTag from "./RcCountsTag"

const RcCountsDetails = () => {
  const { rcCounts } = useRcsCountsContext()

  return (
    <div className='w-full lg:w-[85%] m-auto'>
      <table className='border lg:border-2 border-indigo-500 w-full bg-white'>
        {/* table head */}
        <thead className='bg-indigo-300 sticky top-0'>
          <TableHead text='RC' btext='royal chapter' />
          <TableHead text='MT' btext='meeting type' />
          <TableHead text='M' btext='males' />
          <TableHead text='F' btext='females' />
          <TableHead text='WF' btext='work force' />
          <TableHead text='RCV' btext='retained converts' />
          <TableHead text='FT' btext='first timers' />
          <TableHead text='T' btext='total count' />
        </thead>
        {/* table body */}
        <tbody>
          {rcCounts.map((count) => {
            return <TableRow key={count._id} {...count} />
          })}
        </tbody>
      </table>

      {rcCounts.length === 0 && (
        <h1 className='mt-5 text-md font-semibold text-slate-700'>
          No records on this date. Check other dates
        </h1>
      )}

      <div className='flex justify-between mt-10'>
        <RcCountsTag styling='lg:hidden w-[60%] grid grid-cols-3 h-[50%]' />
        <CountTotals />
      </div>
    </div>
  )
}

export default RcCountsDetails
