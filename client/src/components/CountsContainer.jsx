import { useAllCountsContext } from "../pages/AllCounts"
import SingleCount from "./SingleCount"

const CountsContainer = () => {
  const { allCounts, accOwner } = useAllCountsContext()

  if (allCounts?.length === 0) {
    return (
      <div>
        <h1 className='text-2xl uppercase font-bold'>
          RC {accOwner.royalChapter}
        </h1>
        <h2 className='capitalize my-5 text-slate-800 text-2xl'>
          No records found
        </h2>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-2xl uppercase font-bold'>
        RC {accOwner.royalChapter}
      </h1>
      <h2 className='capitalize my-5 text-slate-800 text-2xl'>
        {allCounts.length} record{allCounts.length > 1 && "s"} found
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {allCounts.map((count) => {
          return <SingleCount key={count._id} {...count} />
        })}
      </div>
    </div>
  )
}

export default CountsContainer
