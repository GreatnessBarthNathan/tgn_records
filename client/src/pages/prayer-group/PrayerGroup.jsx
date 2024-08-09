import { useState, useEffect } from "react"
import EnterRecordForm from "../../components/prayer-group/EnterRecordForm"
import { SingleGroupRecord } from "../../components"
import { useDashboardContext } from "../DashboardLayout"
import dayjs from "dayjs"
import { CiFilter } from "react-icons/ci"

function PrayerGroup() {
  const { fetchGroupRecords } = useDashboardContext()
  const [allGroupRecords, setAllGroupRecords] = useState([])
  const [groupRecords, setGroupRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [date, setDate] = useState("")

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

  useEffect(() => {
    getGroupRecords()
  }, [submitting])

  useEffect(() => {
    getTodayRecords()
  }, [loading])
  return (
    <main className='p-2 lg:p-10'>
      <h1 className='text-2xl mb-5 font-semibold'>Prayer Group Records</h1>

      {/* RECORD FORM */}
      <EnterRecordForm
        setGroupRecords={setGroupRecords}
        groupRecords={groupRecords}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />

      {/* GROUP RECORDS */}
      <section className='mt-10'>
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
              <SingleGroupRecord key={record.leader} {...record} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default PrayerGroup
