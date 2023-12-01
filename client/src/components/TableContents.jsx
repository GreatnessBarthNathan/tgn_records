import React from "react"
import { Link } from "react-router-dom"

export const TableHead = ({ text, btext }) => {
  return (
    <th className='p-1 lg:p-2 capitalize border-r border-b lg:border-r-2 lg:border-b-2 border-indigo-500 text-slate-900 font-semibold text-xs lg:text-base'>
      <span className='block lg:hidden'>{text}</span>
      <span className='hidden lg:block'>{btext}</span>
    </th>
  )
}

export const TableData = ({ text, user }) => {
  return (
    <td className='p-1 lg:p-2 border-b border-r lg:border-b-2 lg:border-r-2 border-indigo-500 text-center capitalize hover:text-indigo-500 text-xs lg:text-base'>
      <Link to={`/dashboard/all-counts/${user}`}>{text}</Link>
    </td>
  )
}

export const TableRow = ({
  _id,
  royalChapter,
  meetingType,
  males,
  females,
  workForce,
  converts,
  firstTimers,
  totalCount,
  user,
}) => {
  return (
    <tr className='hover:bg-indigo-100'>
      <TableData text={royalChapter} user={user} />
      <TableData text={meetingType} user={user} />
      <TableData text={males} user={user} />
      <TableData text={females} user={user} />
      <TableData text={workForce} user={user} />
      <TableData text={converts} user={user} />
      <TableData text={firstTimers} user={user} />
      <TableData text={totalCount} user={user} />
    </tr>
  )
}
