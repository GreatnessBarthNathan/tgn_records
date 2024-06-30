import { useState, useContext, createContext, useEffect } from "react"
import customFetch from "../../utils/customFetch"
import { useParams } from "react-router-dom"
import { CountsContainer, FormRow, FormSelect } from "../../components"
import { meetingType } from "../../utils/constants"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { Loading } from "../../components"

const AllCountsContext = createContext()

const AllCounts = () => {
  const [loading, setLoading] = useState(false)
  const [accOwner, setAccOwner] = useState({})
  const [page, setPage] = useState(0)
  const [counts, setCounts] = useState([])
  const [paginatedArray, setPaginatedArray] = useState([])
  const [allCounts, setAllCounts] = useState([])
  const { id } = useParams()

  // fetch counts
  const fetchCounts = async () => {
    try {
      const {
        data: { counts },
      } = await customFetch.get(`/count/all-counts/${id}`)
      setCounts(counts)
      return counts
    } catch (error) {
      return error
    }
  }

  // pagination
  const paginate = (countsArray) => {
    const itemsPerPage = 20
    const pages = Math.ceil(countsArray.length / itemsPerPage)
    const newArray = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage
      const pagination = countsArray.slice(start, start + itemsPerPage)
      return pagination
    })
    return newArray
  }

  // getCounts
  const getCounts = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await customFetch.get(`/user/${id}`)
    setAccOwner(user)

    const counts = await fetchCounts()

    const pagination = paginate(counts)

    setPaginatedArray(pagination)
    setAllCounts(pagination[page])
    setLoading(false)
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPage(0)
    const formData = new FormData(e.currentTarget)
    const { meetingType, from, to } = Object.fromEntries(formData)
    const url = `/count/all-counts/${accOwner._id}?meetingType=${meetingType}&from=${from}&to=${to}`
    try {
      const {
        data: { counts },
      } = await customFetch.get(url)

      // pagination
      const pagination = paginate(counts)

      setPaginatedArray(pagination)
      setAllCounts(pagination[0])
      setCounts(counts)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  // next page
  const nextPage = () => {
    if (page === paginatedArray.length - 1) {
      setPage(paginatedArray.length - 1)
      setAllCounts(paginatedArray[paginatedArray.length - 1])
    } else {
      setPage(page + 1)
      setAllCounts(paginatedArray[page + 1])
    }
  }

  // previous page
  const previousPage = () => {
    if (page === 0) {
      setPage(0)
      setAllCounts(paginatedArray[0])
    } else {
      setAllCounts(paginatedArray[page - 1])
      setPage(page - 1)
    }
  }

  const values = {
    allCounts,
    accOwner,
    page,
    paginatedArray,
    counts,
  }

  useEffect(() => {
    getCounts()
  }, [])
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

        {loading ? (
          <Loading />
        ) : (
          <>
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
                  Page {page + 1} of {paginatedArray.length}
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
          </>
        )}
      </div>
    </AllCountsContext.Provider>
  )
}

export const useAllCountsContext = () => {
  return useContext(AllCountsContext)
}

export default AllCounts
