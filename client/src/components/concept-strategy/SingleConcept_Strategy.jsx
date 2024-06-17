/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function SingleConcept_Strategy({ _id, name, TEN, suggestion, createdAt }) {
  return (
    <Link
      to={`/dashboard/concept_strategy/${_id}`}
      className='grid grid-cols-9 p-1 md:p-2 bg-white text-[6px] md:text-xs lg:text-sm mt-1 hover:bg-blue-100 ease-in-out duration-300'
    >
      <p className='col-span-2 p-1 md:p-2 text-left'>{name}</p>
      <p className='col-span-2 p-1 md:p-2 text-left'>{TEN}</p>
      <p className='col-span-3 p-1 md:p-2 text-left'>
        {suggestion.slice(0, 30)}...
      </p>
      <p className='col-span-2 p-1 md:p-2 text-left'>
        {createdAt.slice(0, 10)}
      </p>
    </Link>
  )
}

export default SingleConcept_Strategy
