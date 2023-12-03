import { useRcsCountsContext } from "../pages/RcsCounts"

const CountTotals = () => {
  const {
    totals: { males, females, converts, workForce, firstTimers, totalCount },
  } = useRcsCountsContext()
  return (
    <div className='w-[150px] md:w-[200px] bg-white ml-auto rounded-md border lg:border-2 border-indigo-500'>
      <h1 className='text-center p-1 font-semibold text-sm lg:text-base'>
        Totals
      </h1>

      <TotalContents value={males} text='males' />
      <TotalContents value={females} text='females' />
      <TotalContents value={converts} text='converts' />
      <TotalContents value={workForce} text='work force' />
      <TotalContents value={firstTimers} text='first timers' />
      <TotalContents value={totalCount} text='total count' />
    </div>
  )
}

const TotalContents = ({ text, value }) => {
  return (
    <p className='border-t lg:border-t-2 border-indigo-500 grid grid-cols-2 capitalize'>
      <span className='border-r border-indigo-500 p-1 text-[10px] md:text-base'>
        {text}
      </span>
      <span className='text-center text-[10px] p-1 md:text-base'>
        {value || 0}
      </span>
    </p>
  )
}

export default CountTotals
