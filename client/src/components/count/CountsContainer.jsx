import { useAllCountsContext } from "../../pages/count/AllCounts"
import SingleCount from "./SingleCount"

const CountsContainer = () => {
  const { allCounts, accOwner, paginatedArray, page, counts } =
    useAllCountsContext()
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
      <h2 className='my-5 text-slate-800 text-2xl'>
        {paginatedArray.length > 1
          ? `Page ${page + 1} of ${paginatedArray.length}`
          : `${counts.length} record${counts.length > 1 ? "s" : ""}`}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {allCounts &&
          allCounts.map((count) => {
            return <SingleCount key={count._id} {...count} />
          })}
      </div>
    </div>
  )
}

export default CountsContainer
