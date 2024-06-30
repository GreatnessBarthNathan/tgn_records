import { useEffect, useState } from "react"
import customFetch from "../../utils/customFetch"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDashboardContext } from "../DashboardLayout"
import { toast } from "react-toastify"
import axios from "axios"

function SingleMember() {
  const { fetchMembers } = useDashboardContext()
  const { id } = useParams()
  const [member, setMember] = useState([])
  const navigate = useNavigate()

  // GET MEMBER
  const getMember = async () => {
    try {
      const {
        data: { member },
      } = await customFetch.get(`/member/${id}`)
      setMember(member)
    } catch (error) {
      return error
    }
  }

  // DELETE MEMBER
  const deleteMember = async () => {
    const members = await fetchMembers()
    const member = members.find((member) => member._id === id)
    const user_input = prompt(
      `Please type "${
        member.firstName + " " + member.lastName
      }" to delete permanently`
    )
    if (
      user_input !== null &&
      user_input === member.firstName + " " + member.lastName
    ) {
      try {
        await customFetch.delete(`/member/${id}`)
        toast.success("Deletion successful")
        navigate("/dashboard/members")
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.msg)
          return
        }
      }
    } else {
      toast.error("Wrong input. Please enter correct spelling")
    }
  }

  useEffect(() => {
    getMember()
  }, [])
  return (
    <main>
      {member.map((details) => {
        const {
          _id,
          title,
          firstName,
          lastName,
          middleName,
          phoneNumber,
          email,
          address,
          DOB,
          category,
          TEN,
          role,
          sex,
          royalChapter,
        } = details
        return (
          <div key={_id}>
            <h1 className='text-center md:text-2xl lg:text-3xl font-semibold mt-5'>
              {title + " " + firstName + " " + middleName + " " + lastName}
            </h1>

            <div className='w-full text-xs md:text-sm p-1 md:p-2 lg:p-5 lg:text-base border border-[whitesmoke] rounded-md'>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  FIRST NAME
                </span>
                <span className='col-span-2 p-2'>{firstName}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  LAST NAME
                </span>
                <span className='col-span-2 p-2'>{lastName}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  MIDDLE NAME
                </span>
                <span className='col-span-2 p-2'>{middleName}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  GENDER
                </span>
                <span className='col-span-2 p-2'>{sex}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  PHONE NUMBER
                </span>
                <span className='col-span-2 p-2'>{phoneNumber}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  EMAIL
                </span>
                <span className='col-span-2 p-2'>{email}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  ADDRESS
                </span>
                <span className='col-span-2 p-2'>{address}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  DOB
                </span>
                <span className='col-span-2 p-2'>
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: "medium",
                  }).format(new Date(DOB))}
                </span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  TITLE
                </span>
                <span className='col-span-2 p-2'>{title}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  CATEGORY
                </span>
                <span className='col-span-2 p-2'>{category}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  ROYAL CHAPTER
                </span>
                <span className='col-span-2 p-2'>{royalChapter}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border border-b-[whitesmoke] bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  TEN
                </span>
                <span className='col-span-2 p-2'>{TEN}</span>
              </h2>
              <h2 className='grid grid-cols-3 gap-2 border bg-white'>
                <span className='border border-l-0 border-t-0 border-b-0 border-r-[whitesmoke] p-2'>
                  ROLE
                </span>
                <span className='col-span-2 p-2'>{role}</span>
              </h2>
            </div>

            <div className='p-1 md:p-2 lg:p-5 flex justify-between items-center'>
              <Link
                to={`../edit-member/${_id}`}
                className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded'
              >
                EDIT
              </Link>
              <button
                className='bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded'
                onClick={deleteMember}
              >
                DELETE
              </button>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default SingleMember
