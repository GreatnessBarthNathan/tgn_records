import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { redirect, useLoaderData, useNavigate } from "react-router-dom"

export const loader = async ({ params }) => {
  try {
    const {
      data: { cs },
    } = await customFetch.get(`/concept_strategy/${params.id}`)
    return cs
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect("/dashboard/concept_strategy")
  }
}

function SingleConcept_Strategy() {
  const cs = useLoaderData()
  const navigate = useNavigate()

  const deleteCS = async () => {
    try {
      await customFetch.delete(`/concept_strategy/${cs._id}`)
      navigate("/dashboard/concept_strategy")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      navigate("/dashboard/concept_strategy")
    }
  }
  return (
    <main className='w-full p-1 md:p-5 lg:p-10'>
      <div className='w-[80%] lg:w-[40%] text-[8px] md:text-xs lg:text-base border border-[whitesmoke] rounded bg-white'>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke]'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-1'>
            ROYAL CHAPTER
          </span>
          <span className='col-span-2 p-1'>{cs.royalChapter}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke]'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-1'>
            TEN
          </span>
          <span className='col-span-2 p-1'>{cs.TEN}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke]'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-1'>
            NAME
          </span>
          <span className='col-span-2 p-1'>{cs.name}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke]'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-1'>
            PHONE NUMBER
          </span>
          <span className='col-span-2 p-1'>{cs.phoneNumber}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border '>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-1'>
            DATE
          </span>
          <span className='col-span-2 p-1'>{cs.createdAt.slice(0, 10)}</span>
        </h2>
      </div>

      {/* SUGGESTION */}
      <div className='mt-4 text-[8px] md:text-xs lg:text-base'>
        <p className=' bg-white rounded p-2'>{cs.suggestion}</p>
        <button
          className='mt-2 p-1 bg-red-500 text-white hover:bg-red-800 ease-in-out duration-300 rounded'
          onClick={deleteCS}
        >
          Discard
        </button>
      </div>
    </main>
  )
}

export default SingleConcept_Strategy
