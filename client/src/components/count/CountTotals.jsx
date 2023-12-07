import { useRcsCountsContext } from "../../pages/count/RcsCounts"

const CountTotals = () => {
  const {
    totals: { males, females, converts, workForce, firstTimers, totalCount },
  } = useRcsCountsContext()
  return (
    <div className='w-[150px] md:w-[200px] bg-white ml-auto rounded-md border lg:border-2 border-indigo-500'>
      <h1 className='text-center p-1 font-semibold text-sm lg:text-base'>
        Totals
      </h1>

      <TotalContents
        value={new Intl.NumberFormat().format(males)}
        text='males'
      />
      <TotalContents
        value={new Intl.NumberFormat().format(females)}
        text='females'
      />
      <TotalContents
        value={new Intl.NumberFormat().format(converts)}
        text='r.converts'
      />
      <TotalContents
        value={new Intl.NumberFormat().format(workForce)}
        text='work force'
      />
      <TotalContents
        value={new Intl.NumberFormat().format(firstTimers)}
        text='first timers'
      />
      <TotalContents
        value={new Intl.NumberFormat().format(totalCount)}
        text='total count'
      />
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