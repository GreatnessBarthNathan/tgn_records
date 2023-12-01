import * as dayjs from "dayjs"
import { FaCalendarAlt, FaMale, FaFemale } from "react-icons/fa"
import { MdAllOut } from "react-icons/md"
import { SiConvertio } from "react-icons/si"
import { GiBowman } from "react-icons/gi"
import { PiBaby } from "react-icons/pi"
import { Link } from "react-router-dom"
import { useLoaderData, useNavigate } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { months, days } from "../utils/constants"

export const loader = async ({ params }) => {
  try {
    const {
      data: { count },
    } = await customFetch.get(`/count/${params.id}`)
    return count
  } catch (error) {
    return error
  }
}

const DeleteCount = () => {
  const {
    _id,
    user,
    totalCount,
    firstTimers,
    workForce,
    meetingType,
    males,
    females,
    converts,
    enteredAt,
  } = useLoaderData()

  const navigate = useNavigate()
  const countDate = new Date(enteredAt)
  const date = countDate.getDate()
  const day = countDate.getDay()
  const month = countDate.getMonth()
  const year = countDate.getFullYear()

  const deleteItem = async () => {
    try {
      await customFetch.delete(`/count/${_id}`)
      navigate(`/dashboard/all-counts/${user}`)
      toast.success("record deleted")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return navigate(`/dashboard/all-counts/${user}`)
    }
  }
  return (
    <div className='w-full h-full pt-[50px]'>
      {/* ITEM */}
      <div className='bg-white rounded p-4 shadow-md w-[95%] md:w-[70%] lg:w-[50%] m-auto'>
        {/* title and date */}
        <div className='flex justify-between items-baseline border-b pb-2 border-slate-500 '>
          <h2 className='font-bold text-2xl text-indigo-500'>{meetingType}</h2>
          <p className='flex items-center space-x-2 text-indigo-500'>
            <span>{<FaCalendarAlt />}</span>
            <span className='text-sm'>
              {days[day]}, {months[month]} {date}, {year}
            </span>
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
      </div>
      {/*     QUESTION BOX */}
      <div className='text-xs md:text-base text-center mt-[20px] text-slate-700'>
        <p>This record will be permanently deleted.</p>
        <div className='flex items-center justify-center space-x-3 w-full mt-[20px]'>
          <button
            onClick={deleteItem}
            className='bg-indigo-500 text-white py-1 px-2 rounded hover:bg-indigo-800 ease-in-out duration-300 cursor-pointer'
          >
            Continue?
          </button>
          <Link
            to={`/dashboard/all-counts/${user}`}
            className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-800 ease-in-out duration-300'
          >
            Decline
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DeleteCount
