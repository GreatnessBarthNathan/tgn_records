import * as dayjs from "dayjs"

import { FaCalendarAlt, FaMale, FaFemale } from "react-icons/fa"
import { MdAllOut } from "react-icons/md"
import { SiConvertio } from "react-icons/si"
import { GiBowman } from "react-icons/gi"
import { PiBaby } from "react-icons/pi"
import { Link } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"

const SingleCount = ({
  _id,
  totalCount,
  firstTimers,
  workForce,
  meetingType,
  males,
  females,
  converts,
  enteredAt,
}) => {
  const { user } = useDashboardContext()

  const date = new Date(enteredAt).toLocaleDateString()
  const day = new Date(date).getDay()
  console.log(day)

  return (
    // item container
    <div className='bg-white rounded p-4 shadow-md'>
      {/* title and date */}
      <div className='flex justify-between items-baseline border-b pb-2 border-slate-500 '>
        <h2 className='font-bold text-2xl text-indigo-500'>{meetingType}</h2>
        <p className='flex items-center space-x-2 text-indigo-500'>
          <span>{<FaCalendarAlt />}</span>
          {/* <span>{dayjs(enteredAt).format("DD/MM/YYYY")}</span> */}
          <span>{date}</span>
        </p>
      </div>
      {/* content center */}
      <div className='grid grid-cols-2 py-3 text-slate-500'>
        <p className='flex items-center space-x-2 mx-y'>
          <span>{<MdAllOut />}</span>
          <span>total count - {totalCount}</span>
        </p>
        <p className='flex items-center space-x-2 my-1'>
          <span>{<GiBowman />}</span>
          <span>work force - {workForce}</span>
        </p>
        <p className='flex items-center space-x-2 my-1'>
          <span>{<FaMale />}</span>
          <span> males - {males}</span>
        </p>
        <p className='flex items-center space-x-2 my-1'>
          <span>{<PiBaby />}</span>
          <span>first timers - {firstTimers}</span>
        </p>
        <p className='flex items-center space-x-2 my-1'>
          <span>{<FaFemale />}</span>
          <span> females - {females}</span>
        </p>

        <p className='flex items-center space-x-2 my-1'>
          <span>{<SiConvertio />}</span>
          <span>converts - {converts}</span>
        </p>
      </div>
      <div className='flex items-center space-x-5 text-slate-700 capitalize'>
        <Link
          to={`/dashboard/edit-count/${_id}`}
          className='bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer hover:bg-green-500 hover:text-white ease-in-out duration-300 '
        >
          edit
        </Link>
        {user.role === "admin" && (
          <Link
            to={`/dashboard/delete-count/${_id}`}
            className='bg-indigo-500 text-white py-1 px-2 rounded ursor-pointer hover:bg-red-500 hover:text-white ease-in-out duration-300 '
          >
            delete
          </Link>
        )}
      </div>
    </div>
  )
}

export default SingleCount
