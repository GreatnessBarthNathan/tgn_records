import { Link } from "react-router-dom"

function SingleMember({
  title,
  firstName,
  lastName,
  phoneNumber,
  category,
  DOB,
  role,
  _id,
}) {
  return (
    <li className='bg-white grid grid-cols-6 w-full'>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm col-span-2 border border-t-0 border-r-0'>
        {title + " " + firstName + " " + lastName}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-t-0 border-r-0'>
        {phoneNumber}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-t-0 border-r-0'>
        {category}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-t-0 border-r-0'>
        {DOB.slice(0, 10).split("-").reverse().join("/")}
      </p>
      <p className='p-1 lg:p-2 text-[8px] md:text-xs lg:text-sm border border-t-0 flex justify-between items-center'>
        <span>{role}</span>
        <Link
          to={`../single-member/${_id}`}
          className='text-indigo-500 font-semibold'
        >
          more
        </Link>
      </p>
    </li>
  )
}

export default SingleMember
