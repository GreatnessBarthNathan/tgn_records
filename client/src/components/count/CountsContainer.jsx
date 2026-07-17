import { useAllCountsContext } from "../../pages/count/AllCounts"
import SingleCount from "./SingleCount"

const CountsContainer = () => {
  const { data, rc, page} = useAllCountsContext()
  if (data.totalCount === 0) {
    return (
      <div>
        <h1 className='text-2xl uppercase font-bold'> 
          RC {rc.name}
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
        RC {rc.name}
      </h1>
     

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data &&
          data.counts.map((count) => {
            return <SingleCount key={count._id} {...count} />
          })}
      </div>
    </div>
  )
}

export default CountsContainer
