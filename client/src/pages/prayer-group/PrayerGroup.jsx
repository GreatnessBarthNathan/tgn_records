import { useState, useEffect } from "react"
import { SingleGroupRecord } from "../../components"
import { useDashboardContext } from "../DashboardLayout"
import dayjs from "dayjs"
import { CiFilter } from "react-icons/ci"
import { Link } from "react-router-dom"

function PrayerGroup() {
  const { submitting } = useDashboardContext()
  const { fetchGroupRecords } = useDashboardContext()
  const [allGroupRecords, setAllGroupRecords] = useState([])
  const [groupRecords, setGroupRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState("")
  const [totals, setTotals] = useState({})

  const getGroupRecords = async () => {
    setLoading(true)
    const groupRecords = await fetchGroupRecords()
    setAllGroupRecords(groupRecords)
    setLoading(false)
  }

  // get Today's Records
  const getTodayRecords = () => {
    const today = dayjs(new Date(Date.now())).format("YYYY-MM-DD")
    setDate(
      new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        new Date(Date.now())
      )
    )

    const groupRecords = allGroupRecords.filter(
      (record) => record.enteredAt >= today && record.enteredAt <= today
    )
    setGroupRecords(groupRecords)
  }

  // filter Results
  const searchDate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("date")
    setDate(
      new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        new Date(name)
      )
    )
    const groupRecords = allGroupRecords.filter(
      (record) => record.enteredAt >= name && record.enteredAt <= name
    )
    setGroupRecords(groupRecords)
  }

  const calculateTotals = () => {
    const totals = groupRecords.reduce(
      (total, value) => {
        total.expected += value.expectedCount
        total.actual += value.actualCount
        return total
      },
      { expected: 0, actual: 0 }
    )
    setTotals(totals)
  }
  useEffect(() => {
    getGroupRecords()
  }, [submitting])

  useEffect(() => {
    getTodayRecords()
  }, [loading])

  useEffect(() => {
    calculateTotals()
  }, [groupRecords])
  return (
    <main className='p-2 lg:p-10'>
      <h1 className='text-base md:text-2xl mb-5 font-semibold'>
        Prayer Group Records
      </h1>

      {/* GROUP RECORDS */}
      <section className='mt-5 lg:mt-10'>
        <div className='text-right mb-2'>
          <Link
            to='/dashboard/creategrouprecord'
            className='bg-indigo-500 rounded-md p-1 text-white text-xs md:text-base'
          >
            New Record
          </Link>
        </div>
        <div className='mb-1 flex justify-between'>
          <h2 className='font-semibold text-xs md:text-base'>{date}</h2>
          <form
            onSubmit={searchDate}
            className='border border-indigo-500 rounded-[10px] overflow-hidden flex w-[50%]'
          >
            <input
              type='date'
              className='p-1 w-[85%] border-none outline-none text-xs'
              name='date'
            />
            <button
              type='submit'
              className='w-[15%] flex justify-center items-center bg-indigo-500 text-white'
            >
              <CiFilter />
            </button>
          </form>
        </div>
        {/* Table Head */}
        <div className='bg-white sticky top-0 grid grid-cols-7 border border-t-indigo-500 border-b-indigo-500 z-10'>
          <h2 className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            Group
          </h2>
          <h2 className='col-span-2 p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            Leader
          </h2>
          <h2 className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            Expected Count
          </h2>
          <h2 className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            Actual Count
          </h2>
          <h2 className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            Start Time
          </h2>
          <h2 className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 text-[8px] md:text-xs lg:text-sm'>
            End Time
          </h2>
        </div>
        {groupRecords.length < 1 ? (
          <h2 className='text-center mt-4 font-semibold'>No records found</h2>
        ) : (
          <div>
            {groupRecords.map((record) => (
              <SingleGroupRecord key={record._id} {...record} />
            ))}
          </div>
        )}
      </section>

      <div className='bg-white hover:bg-indigo-100 w-[200px]  mt-5'>
        <h2 className='border p-1 text-center text-xs md:text-base'>Total</h2>
        <h2 className='grid border grid-cols-2 capitalize'>
          <span className='p-1 text-[10px] border-r md:text-sm lg:text-base'>
            Expected
          </span>
          <span className='text-center text-[10px] p-1 md:text-sm lg:text-base'>
            {new Intl.NumberFormat().format(totals?.expected)}
          </span>
        </h2>
        <h2 className='grid border grid-cols-2 capitalize'>
          <span className=' p-1 text-[10px] border-r md:text-sm lg:text-base'>
            Actual
          </span>
          <span className='text-center text-[10px] p-1 md:text-sm lg:text-base'>
            {new Intl.NumberFormat().format(totals?.actual)}
          </span>
        </h2>
      </div>
    </main>
  )
}

export default PrayerGroup
