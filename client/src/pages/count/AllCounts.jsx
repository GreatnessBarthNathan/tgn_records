import { useState, useContext, createContext, useEffect } from 'react'
import customFetch from '../../utils/customFetch'
import { useParams } from 'react-router-dom'
import { CountsContainer, FormRow, FormSelect } from '../../components'
import { Loading } from '../../components'
import Pagination from '../../components/Pagination'
import { toast } from 'react-toastify'
import { MEETING_TYPE } from '../../utils/constants'
import dayjs from 'dayjs'

const AllCountsContext = createContext()

const AllCounts = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [data, setData] = useState({
    counts: [],
    totalCounts: 0,
    numOfPages: 0,
  })
  const [rc, setRC] = useState({})
  const { id } = useParams()
  const [meetingType] = useState(MEETING_TYPE)
  const [meeting, setMeeting] = useState('ALL')
  const [queryDate, setQueryDate] = useState({
    from: dayjs('2022-01-01').format('YYYY-MM-DD'),
    to: dayjs(new Date(Date.now())).format('YYYY-MM-DD'),
  })

  // fetch counts
  const fetchCounts = async () => {
    setLoading(true)
    try {
      const {
        data: { counts, totalCounts, numOfPages },
      } = await customFetch.get(
        `/count/all-counts/${id}?page=${page}&limit=${limit}&meetingType=${meeting}&from=${queryDate.from}&to=${queryDate.to}`,
      )
      setData({
        counts: counts,
        totalCounts: totalCounts,
        numOfPages: numOfPages,
      })

      setLoading(false)
      return counts
    } catch (error) {
      setLoading(false)
      return error
    }
  }

  const getRC = async () => {
    const {
      data: { user },
    } = await customFetch.get(`/user/${id}`)
    if (!user) toast.error('user not found')

    const {
      data: { rc },
    } = await customFetch.get(`/rc/${user.rc}`)

    setRC(rc)
    return rc
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPage(1)
    const formData = new FormData(e.currentTarget)
    const { meetingType, from, to } = Object.fromEntries(formData)

    const {
      data: { user },
    } = await customFetch.get(`/user/${id}`)
    if (!user) toast.error('user not found')

    const url = `/count/all-counts/${user._id}?meetingType=${meetingType}&from=${from}&to=${to}&page=${page}&limit=${limit}`

    try {
      const {
        data: { counts, totalCounts, numOfPages },
      } = await customFetch.get(url)

      setData({
        counts: counts,
        totalCounts: totalCounts,
        numOfPages: numOfPages,
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // const createMeetingType = async () => {
  //   const counts = await fetchCounts()

  //   const meetingType = [
  //     'ALL',
  //     ...new Set(counts.map((count) => count.meetingType)),
  //   ]
  //   setMeetingType(meetingType)
  // }

  const values = {
    rc,
    page,
    data,
  }

  useEffect(() => {
    getRC()
    // createMeetingType()
  }, [])

  useEffect(() => {
    fetchCounts()
  }, [page])

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
              onChange={(e) => setMeeting(e.target.value)}
            />
            <FormRow
              type='date'
              name='from'
              labelText='from'
              onChange={(e) =>
                setQueryDate({ ...queryDate, from: e.target.value })
              }
            />
            <FormRow
              type='date'
              name='to'
              labelText='to'
              onChange={(e) =>
                setQueryDate({ ...queryDate, to: e.target.value })
              }
            />
            <button
              type='submit'
              className='text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-[10px]'
            >
              Submit
            </button>
          </form>
        </div>

        <>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {/* counts */}
              <CountsContainer />
              {data && data.numOfPages > 1 && (
                <Pagination page={page} data={data} setPage={setPage} />
              )}
            </div>
          )}
        </>
      </div>
    </AllCountsContext.Provider>
  )
}

export const useAllCountsContext = () => {
  return useContext(AllCountsContext)
}

export default AllCounts
