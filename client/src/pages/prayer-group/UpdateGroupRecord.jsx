import { useState, useEffect } from "react"
import { FormRow } from "../../components"
import GroupModal from "../../components/prayer-group/GroupModal"
import { hours, mins, am_pm } from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDashboardContext } from "../DashboardLayout"
import { useParams, useLoaderData } from "react-router-dom"

export const loader = async ({ params }) => {
  try {
    const {
      data: { groupRecord },
    } = await customFetch.get(`/group-record/${params.id}`)
    return groupRecord
  } catch (error) {
    return error
  }
}

function UpdateRecordForm() {
  const groupRecord = useLoaderData()
  const { submitting, setSubmitting, user } = useDashboardContext()
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [actualCount, setActualCount] = useState(groupRecord.actualCount)
  const [enteredAt, setEnteredAt] = useState(groupRecord.enteredAt)
  const [prayerGroup, setPrayerGroup] = useState({
    group: groupRecord.group,
    leader: groupRecord.leader,
    expectedCount: groupRecord.expectedCount,
  })
  const [startTime, setStartTime] = useState({
    hour: groupRecord.startTime.hour,
    min: groupRecord.startTime.min,
    time: groupRecord.startTime.time,
  })
  const [endTime, setEndTime] = useState({
    hour: groupRecord.endTime.hour,
    min: groupRecord.endTime.min,
    time: groupRecord.endTime.time,
  })
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const data = {
      ...prayerGroup,
      actualCount,
      startTime,
      endTime,
      enteredAt,
    }
    try {
      await customFetch.patch(`/group-record/${id}`, data)
      toast.success("record updated")
      navigate("/dashboard/prayer-group")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
    setSubmitting(false)
  }

  return (
    <main className='p-2 lg:p-10'>
      <h1 className='lg:text-3xl font-semibold mb-4'>Update Group Record</h1>
      <div className='bg-white w-full p-4 rounded-md shadow-md'>
        <form className='grid lg:grid-cols-2 gap-5' onSubmit={handleSubmit}>
          <FormRow
            type='text'
            name='leader'
            defaultValue={prayerGroup.leader}
            extraStyle='mb-0 mt-0'
            onClick={() => setShowGroupModal(true)}
            required
            readOnly
          />
          <FormRow
            type='text'
            name='group'
            defaultValue={prayerGroup.group}
            extraStyle='mb-0 mt-0'
            readOnly
            required
          />
          <FormRow
            type='number'
            name='expected-count'
            defaultValue={prayerGroup.expectedCount}
            extraStyle='mb-0 mt-0'
            readOnly
            required
          />
          <FormRow
            type='number'
            name='actual-count'
            required
            value={actualCount}
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
                value={startTime.hour}
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
                value={startTime.min}
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
                defaultValue={startTime.time}
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
                defaultValue={endTime.hour}
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
                defaultValue={endTime.min}
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
                defaultValue={endTime.time}
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
          {user.role === "admin" && (
            <FormRow
              type='date'
              value={enteredAt}
              onChange={(e) => setEnteredAt(e.target.value)}
            />
          )}
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

export default UpdateRecordForm
