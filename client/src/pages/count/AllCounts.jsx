import { useState, useContext, createContext } from "react"
import customFetch from "../../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { CountsContainer, FormRow, FormSelect } from "../../components"
import { meetingType } from "../../utils/constants"

const AllCountsContext = createContext()

export const loader = async ({ params }) => {
  try {
    // get counts
    const {
      data: { counts },
    } = await customFetch.get(`/count/all-counts/${params.id}`)

    // get single user
    const {
      data: { user },
    } = await customFetch.get(`/user/${params.id}`)
    return { counts, user }
  } catch (error) {
    return error
  }
}

const AllCounts = () => {
  const { counts, user: accOwner } = useLoaderData()
  const [allCounts, setAllCounts] = useState(counts)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { meetingType, from, to } = Object.fromEntries(formData)

    const url = `/count/all-counts/${accOwner._id}?meetingType=${meetingType}&from=${from}&to=${to}`
    try {
      const {
        data: { counts },
      } = await customFetch.get(url)
      setAllCounts(counts)
      console.log(counts)
    } catch (error) {
      console.log(error)
    }
  }

  const values = { allCounts, accOwner }
  return (
    <AllCountsContext.Provider value={values}>
      {/* wrapper */}
      <div className='p-3 md:p-10'>
        {/* form */}
        <div className='bg-white p-5 md:p-10 rounded shadow-md mb-20'>
          <h2 className='text-2xl text-slate-800 mb-5'>Search Form</h2>
          <form
            action='submit'
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
          >
            <FormSelect
              name='meetingType'
              defaultValue={Object.values(meetingType).ALL}
              list={Object.values(meetingType)}
              labelText='Meeting Type'
            />
            <FormRow type='date' name='from' labelText='from' />
            <FormRow type='date' name='to' labelText='to' />
            <button
              type='submit'
              className='text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-[10px]'
            >
              Submit
            </button>
          </form>
        </div>

        {/* counts */}
        <CountsContainer />
      </div>
    </AllCountsContext.Provider>
  )
}

export const useAllCountsContext = () => {
  return useContext(AllCountsContext)
}

export default AllCounts
