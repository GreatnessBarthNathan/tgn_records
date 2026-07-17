/* eslint-disable react/prop-types */
import { useRcsCountsContext } from '../../pages/count/RcsCounts'
import { FaCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const SingleCountTag = ({ _id, name, handler }) => {
  const { ids } = useRcsCountsContext()

  return (
    <div
      key={_id}
      className='flex items-center space-x-1 md:space-x-3 capitalize lg:uppercase lg:mb-2'
    >
      <div
        className={` w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] border border-blue-500 flex justify-center items-center rounded ${
          ids.includes(_id) ? 'bg-indigo-500' : 'bg-white'
        }`}
      >
        <button
          className={`text-[7px] flex justify-center items-center ${
            ids.includes(_id) ? 'text-white' : 'text-transparent'
          }`}
        >
          <FaCheck />
        </button>
      </div>
      <Link
        to={`/dashboard/all-counts/${handler}`}
        className='text-xs hover:text-indigo-500 hover:font-semibold hidden md:block'
      >
        {name}
      </Link>
      <Link
        to={`/dashboard/all-counts/${handler}`}
        className='text-[6px] hover:text-indigo-500 hover:font-semibold md:hidden'
      >
        {name.length < 15 ? name : name.substring(0, 15) + '.'}
      </Link>
    </div>
  )
}

export default SingleCountTag
