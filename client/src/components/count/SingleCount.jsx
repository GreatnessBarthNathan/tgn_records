/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaMale, FaFemale } from "react-icons/fa"
import { FaChildren } from "react-icons/fa6"
import { MdAllOut } from "react-icons/md"
import { SiConvertio } from "react-icons/si"
import { GiBowman } from "react-icons/gi"
import { PiBaby } from "react-icons/pi"
import { Link } from "react-router-dom"
import { useDashboardContext } from "../../pages/DashboardLayout"
import { months, days } from "../../utils/constants"

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
  children,
}) => {
  const { user } = useDashboardContext()
  const countDate = new Date(enteredAt)
  const date = countDate.getDate()
  const day = countDate.getDay()
  const month = countDate.getMonth()
  const year = countDate.getFullYear()

  return (
    // item container
    <div className='bg-white rounded p-2 shadow-md'>
      {/* title and date */}
      <div className='flex justify-between items-baseline border-b pb-2 border-slate-500 '>
        <h2 className='font-bold text-base lg:text-2xl text-indigo-500'>
          {meetingType}
        </h2>
        <p className='flex items-center space-x-2 text-indigo-500'>
          <span>{<FaCalendarAlt />}</span>
          <span className='text-sm'>
            {days[day]}, {months[month]} {date}, {year}
          </span>
        </p>
      </div>
      {/* content center */}
      <div className='grid grid-cols-2 py-3 text-slate-500'>
        <p className='flex items-center space-x-2 mx-y text-xs md:text-base capitalize'>
          <span>{<MdAllOut />}</span>
          <span>
            total count - {new Intl.NumberFormat().format(totalCount)}
          </span>
        </p>
        <p className='flex items-center space-x-2 my-1 text-xs md:text-sm capitalize'>
          <span>{<GiBowman />}</span>
          <span>work force - {new Intl.NumberFormat().format(workForce)}</span>
        </p>
        <p className='flex items-center space-x-2 my-1 text-xs md:text-base capitalize'>
          <span>{<FaMale />}</span>
          <span> males - {new Intl.NumberFormat().format(males)}</span>
        </p>
        <p className='flex items-center space-x-2 my-1 text-xs md:text-base capitalize'>
          <span>{<FaChildren />}</span>
          <span>
            first timers - {new Intl.NumberFormat().format(firstTimers)}
          </span>
        </p>
        <p className='flex items-center space-x-2 my-1 text-xs md:text-base capitalize'>
          <span>{<FaFemale />}</span>
          <span> females - {new Intl.NumberFormat().format(females)}</span>
        </p>

        <p className='flex items-center space-x-2 my-1 text-xs md:text-base capitalize'>
          <span>{<SiConvertio />}</span>
          <span>r.converts - {new Intl.NumberFormat().format(converts)}</span>
        </p>
        <p className='flex items-center space-x-2 my-1 text-xs md:text-base capitalize'>
          <span>{<PiBaby />}</span>
          <span>children - {new Intl.NumberFormat().format(children)}</span>
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
