import { useDashboardContext } from "../../pages/DashboardLayout"
import { Link } from "react-router-dom"

function SingleTen({ _id, name, leader, assistant, VIP, venue }) {
  const { user } = useDashboardContext()
  return (
    <main>
      <h1 className='text-center md:text-2xl lg:text-3xl font-semibold mt-5'>
        {name}
      </h1>

      <div className='w-full text-xs md:text-sm lg:text-base border border-[whitesmoke] rounded-md'>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
            LEADER
          </span>
          <span className='col-span-2 p-2'>{leader}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
            ASSISTANT
          </span>
          <span className='col-span-2 p-2'>{assistant}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
            VIP
          </span>
          <span className='col-span-2 p-2'>{VIP}</span>
        </h2>
        <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
          <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
            VENUE
          </span>
          <span className='col-span-2 p-2'>{venue}</span>
        </h2>
      </div>
      <div className='text-xs md:text-sm lg:text-base flex'>
        <Link
          to={`../edit-ten/${_id}`}
          className='py-[6px] px-3 rounded border-2 border-white mr-10 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white'
        >
          Edit
        </Link>

        {user.role === "admin" && (
          <button className='py-1 px-3 rounded border border-red-500 mr-10 hover:bg-red-500 hover:text-white '>
            Delete
          </button>
        )}
      </div>
    </main>
  )
}

export default SingleTen
