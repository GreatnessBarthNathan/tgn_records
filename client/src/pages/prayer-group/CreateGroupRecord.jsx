import { useState } from "react"
import { FormRow } from "../../components"
import GroupModal from "../../components/prayer-group/GroupModal"
import { hours, mins, am_pm } from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDashboardContext } from "../DashboardLayout"

function EnterRecordForm() {
  const { submitting, setSubmitting } = useDashboardContext()
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [actualCount, setActualCount] = useState(0)
  const [prayerGroup, setPrayerGroup] = useState({
    group: 0,
    leader: "",
    expectedCount: 0,
  })
  const [startTime, setStartTime] = useState({
    hour: "01",
    min: "00",
    time: "AM",
  })
  const [endTime, setEndTime] = useState({
    hour: "01",
    min: "00",
    time: "AM",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const data = {
      ...prayerGroup,
      actualCount,
      startTime,
      endTime,
    }
    try {
      await customFetch.post("/group-record", data)
      toast.success("record saved")
      navigate("/dashboard/prayer-group")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
    setSubmitting(false)
  }

  return (
    <main className='p-2 lg:p-10'>
      <h1 className='lg:text-3xl font-semibold mb-4'>Enter New Record</h1>
      <div className='bg-white w-full p-4 rounded-md shadow-md'>
        <form className='grid lg:grid-cols-2 gap-5' onSubmit={handleSubmit}>
          <FormRow
            type='text'
            name='leader'
            value={prayerGroup.leader}
            extraStyle='mb-0 mt-0'
            onClick={() => setShowGroupModal(true)}
            required
            readOnly
          />
          <FormRow
            type='text'
            name='group'
            value={prayerGroup.group}
            extraStyle='mb-0 mt-0'
            readOnly
            required
          />
          <FormRow
            type='number'
            name='expected-count'
            value={prayerGroup.expectedCount}
            extraStyle='mb-0 mt-0'
            readOnly
            required
          />
          <FormRow
            type='number'
            name='actual-count'
            required
            extraStyle='mb-0 mt-0'
            onChange={(e) => setActualCount(e.target.value)}
          />

          {/* START TIME */}
          <div className='w-full'>
            <label
              htmlFor=''
              className='block mb-2 font-semibold text-slate-500'
            >
              Start Time
            </label>
            <div className='border border-blue-200 rounded p-1 flex justify-around'>
              <select
                name=''
                id=''
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setStartTime({ ...startTime, hour: e.target.value })
                }
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setStartTime({ ...startTime, min: e.target.value })
                }
              >
                {mins.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <select
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setStartTime({ ...startTime, time: e.target.value })
                }
              >
                {am_pm.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* END TIME */}

          <div className='w-full'>
            <label
              htmlFor=''
              className='block mb-2 font-semibold text-slate-500'
            >
              End Time
            </label>
            <div className='border border-blue-200 rounded p-1 flex justify-around'>
              <select
                name=''
                id=''
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setEndTime({ ...endTime, hour: e.target.value })
                }
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setEndTime({ ...endTime, min: e.target.value })
                }
              >
                {mins.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <select
                className='bg-[whitesmoke] rounded p-1'
                required
                onChange={(e) =>
                  setEndTime({ ...endTime, time: e.target.value })
                }
              >
                {am_pm.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type='submit'
            className={`lg:col-span-2 bg-indigo-500 hover:bg-indigo-700 p-2 rounded text-white font-semibold mt-3 ${
              submitting && "cursor-wait"
            }`}
            disabled={submitting}
          >
            {submitting ? "Submitting" : "Submit Record"}
          </button>
        </form>

        {showGroupModal && (
          <GroupModal
            setPrayerGroup={setPrayerGroup}
            setShowGroupModal={setShowGroupModal}
            prayerGroup={prayerGroup}
          />
        )}
      </div>
    </main>
  )
}

export default EnterRecordForm
