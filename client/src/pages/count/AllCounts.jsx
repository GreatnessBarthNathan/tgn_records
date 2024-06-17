import { useState, useContext, createContext, useEffect } from "react"
import customFetch from "../../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { CountsContainer, FormRow, FormSelect } from "../../components"
import { meetingType } from "../../utils/constants"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const AllCountsContext = createContext()

export const loader = async ({ params }) => {
  try {
    // get counts
    const {
      data: { counts },
    } = await customFetch.get(`/count/all-counts/${params.id}`)

    // pagination
    const itemsPerPage = 20
    const pages = Math.ceil(counts.length / itemsPerPage)
    const newArray = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage
      const pagination = counts.slice(start, start + itemsPerPage)
      return pagination
    })
    // get single user
    const {
      data: { user },
    } = await customFetch.get(`/user/${params.id}`)
    return { counts, user, newArray }
  } catch (error) {
    return error
  }
}

const AllCounts = () => {
  const { user: accOwner, newArray, counts } = useLoaderData()
  const [page, setPage] = useState(0)
  const [newCounts, setNewCounts] = useState(counts)
  const [approvedCounts, setApprovedCounts] = useState(newCounts)
  const [paginatedArray, setPaginatedArray] = useState(newArray)
  const [allCounts, setAllCounts] = useState(paginatedArray[page])
  const [noOfPages] = useState(Math.ceil(approvedCounts.length / 20))

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { meetingType, from, to } = Object.fromEntries(formData)

    const url = `/count/all-counts/${accOwner._id}?meetingType=${meetingType}&from=${from}&to=${to}`
    try {
      const {
        data: { counts },
      } = await customFetch.get(url)

      // pagination
      const itemsPerPage = 20
      const pages = Math.ceil(counts.length / itemsPerPage)
      const newArray = Array.from({ length: pages }, (_, index) => {
        const start = index * itemsPerPage
        const pagination = counts.slice(start, start + itemsPerPage)
        return pagination
      })
      setNewCounts(counts)
      setPaginatedArray(newArray)
    } catch (error) {
      console.log(error)
    }
  }

  // next page
  const nextPage = () => {
    if (page === paginatedArray.length - 1) {
      setPage(newArray.length - 1)
    } else {
      setPage(page + 1)
    }
  }

  // previous page
  const previousPage = () => {
    if (page === 0) {
      setPage(0)
    } else {
      setPage(page - 1)
    }
  }

  const values = { allCounts, accOwner, approvedCounts }
  useEffect(() => {
    const intervalID = setInterval(() => {
      setApprovedCounts(newCounts)
      setAllCounts(paginatedArray[page])
    }, 200)

    return () => clearInterval(intervalID)
  })
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

        {/* PAGINATION */}
        {paginatedArray.length > 1 && (
          <div className='mt-5 flex justify-between items-center text-xs md:text-sm lg:text-base'>
            <div className='flex items-center space-x-3'>
              <button
                className={`${
                  page === 0
                    ? "bg-[whitesmoke] text-black border-2 border-slate-200"
                    : "bg-indigo-500"
                } px-3 py-2 rounded text-white`}
                onClick={previousPage}
              >
                <FaAngleLeft />
              </button>
              <span className='text-indigo-500'>Previous</span>
            </div>
            <p className='text-[8px] md:text-xs lg:text-base'>
              Page {page + 1} of {noOfPages}
            </p>
            <div className='flex items-center justify-center space-x-3'>
              <span className='text-indigo-500'>Next</span>
              <button
                className={`${
                  page === paginatedArray.length - 1
                    ? "bg-[whitesmoke] text-black border-2 border-slate-200"
                    : "bg-indigo-500"
                } px-3 py-2 rounded text-white`}
                onClick={nextPage}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </AllCountsContext.Provider>
  )
}

export const useAllCountsContext = () => {
  return useContext(AllCountsContext)
}

export default AllCounts
