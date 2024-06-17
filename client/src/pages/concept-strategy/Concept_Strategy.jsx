import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useLoaderData, Link } from "react-router-dom"
import SingleConcept_Strategy from "../../components/concept-strategy/SingleConcept_Strategy"

export const loader = async () => {
  try {
    const {
      data: { allCS },
    } = await customFetch.get("/concept_strategy")
    return { allCS }
  } catch (error) {
    return toast.error(error.response.data.msg)
  }
}

function Concept_Strategy() {
  const { allCS } = useLoaderData()

  return (
    <main className='w-full p-1 md:p-5 lg:p-10'>
      <h1 className='text-sm lg:text-3xl mb-5 font-bold'>Concept&Strategy</h1>
      {allCS.length < 1 ? (
        <h1 className='mt-5'>No record found</h1>
      ) : (
        <div className='mt-5 lg:mt-10'>
          <div className='flex justify-between items-center text-[8px] md:xs lg:text-base'>
            <h2>{allCS.length} Results</h2>
            <Link
              to='/dashboard/create-cs'
              className='bg-blue-500 text-white rounded py-1 px-2 hover:bg-blue-800 ease-in-out duration-300'
            >
              New Concept/Strategy
            </Link>
          </div>
          {/* TABLE HEAD */}
          <div className='mt-2 grid grid-cols-9 sticky top-0 border border-white border-b-slate-600 border-t-slate-600 p-1 md:p-2 font-bold bg-white text-[8px] md:text-xs lg:text-base'>
            <h2 className='col-span-2 p-1 md:p-2 text-left'>Name</h2>
            <h2 className='col-span-2 p-1 md:p-2 text-left'>TEN</h2>
            <h2 className='col-span-3 p-1 md:p-2 text-left'>Suggestion</h2>
            <h2 className='col-span-2 p-1 md:p-2 text-left'>Date</h2>
          </div>

          {/* TABLE BODY */}
          {allCS.map((cs) => {
            return <SingleConcept_Strategy key={cs._id} {...cs} />
          })}
        </div>
      )}
    </main>
  )
}

export default Concept_Strategy
