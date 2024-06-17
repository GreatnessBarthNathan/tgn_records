/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export const TableHead = ({ text, btext, style }) => {
  return (
    <h2 className={style}>
      <span className='block lg:hidden'>{text}</span>
      <span className='hidden lg:block'>{btext}</span>
    </h2>
  )
}

export const TableData = ({ text, user, style }) => {
  return (
    <p className={style}>
      <Link to={`/dashboard/all-counts/${user}`}>{text}</Link>
    </p>
  )
}

export const TableRow = ({
  royalChapter,
  meetingType,
  males,
  females,
  workForce,
  converts,
  children,
  firstTimers,
  totalCount,
  user,
}) => {
  return (
    <div className='bg-white hover:bg-indigo-100 grid grid-cols-12 w-full hover:cursor-pointer'>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm col-span-3 border border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>{royalChapter}</Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm col-span-2 border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>{meetingType}</Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(males)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(females)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(children)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(workForce)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(converts)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(firstTimers)}
        </Link>
      </p>
      <p className='p-1 lg:p-2 text-[6px] md:text-[8px] lg:text-sm col-span-1 border border-l-0 border-t-0'>
        <Link to={`/dashboard/all-counts/${user}`}>
          {new Intl.NumberFormat().format(totalCount)}
        </Link>
      </p>
    </div>
  )
}
