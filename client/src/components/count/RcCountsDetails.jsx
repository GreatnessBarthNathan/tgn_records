import { useRcsCountsContext } from "../../pages/count/RcsCounts"
import { TableHead, TableRow } from "../TableContents"
import CountTotals from "./CountTotals"
import RcCountsTag from "./RcCountsTag"

const RcCountsDetails = () => {
  const { rcCounts } = useRcsCountsContext()

  return (
    <div className='w-full m-auto'>
      {/* table */}
      <div className='w-full'>
        {/* table head */}
        <div className='bg-white sticky top-0 grid grid-cols-12 border border-t-indigo-500 border-b-indigo-500'>
          <TableHead
            text='royal chapter'
            btext='royal chapter'
            style='p-1 lg:p-2 capitalize col-span-3 border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='meeting type'
            btext='meeting type'
            style='p-1 lg:p-2 capitalize col-span-2 border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='males'
            btext='males'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='females'
            btext='females'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='children'
            btext='children'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='WF'
            btext='work force'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='RCV'
            btext='R.converts'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='F.timers'
            btext='first timers'
            style='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
          <TableHead
            text='total'
            btext='total'
            style='p-1 lg:p-2 capitalize col-span-1 border border-l-0 border-t-0 border-b-0 text-[6px] md:text-[8px] lg:text-sm'
          />
        </div>
        {/* table body */}
        {rcCounts.length === 0 ? (
          <h1 className='mt-5 text-md font-semibold text-slate-700'>
            No records on this date. Check other dates
          </h1>
        ) : (
          <>
            {rcCounts.map((count) => {
              return <TableRow key={count._id} {...count} />
            })}
          </>
        )}
      </div>

      <div className='flex justify-between mt-10 pb-5'>
        <RcCountsTag styling='w-[60%] grid grid-cols-3 h-[50%]' />
        <CountTotals />
      </div>
    </div>
  )
}

export default RcCountsDetails
