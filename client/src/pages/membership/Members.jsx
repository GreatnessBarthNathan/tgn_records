import { useEffect, useState, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { useDashboardContext } from "../DashboardLayout"
import { SingleMember, Loading, Titles } from "../../components"

function Members() {
  const { fetchMembers, fetchTENs, user } = useDashboardContext()
  const [allMembers, setAllMembers] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [tenName, setTenName] = useState([])

  // GET MEMBERS
  const getRCMembers = async () => {
    setLoading(true)
    let members = await fetchMembers()
    members = members.filter(
      (member) => member.royalChapter === user.royalChapter
    )
    const tens = await fetchTENs()
    const tenNames = tens.map((ten) => ten.name)

    setTenName(tenNames)
    setAllMembers(members)
    setMembers(members)
    setLoading(false)
  }

  // FILTER MEMBERS
  const filterByTitle = async (e) => {
    const value = e.target.value
    const rcMembers = allMembers.filter((member) => {
      if (value === "All") {
        return member
      } else if (member.title === value) {
        return member
      } else if (member.category === value) {
        return member
      } else if (member.role === value) {
        return member
      } else if (member.TEN === value) {
        return member
      }
    })
    setMembers(rcMembers)
  }

  const titleBtns = [
    "All",
    ...new Set(allMembers.map((member) => member.title)),
    ...new Set(allMembers.map((member) => member.category)),
    ...new Set(allMembers.map((member) => member.role)),
    ...tenName,
  ]

  useEffect(() => {
    getRCMembers()
  }, [])
  return (
    <main className='p-1 md:p-5 lg:p-10'>
      <h1 className='text-base md:text-2xl lg:text-3xl font-semibold'>
        Members
      </h1>

      {/* TITLES */}
      <Titles titleBtns={titleBtns} filterByTitle={filterByTitle} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className='text-xs md:text-base flex justify-between items-center mb-2'>
            <span>{members.length} Results</span>
            <span>
              <Link
                to='../add-member'
                className='bg-blue-500 text-white rounded py-1 px-2 hover:bg-blue-800 ease-in-out duration-300'
              >
                Add Member
              </Link>
            </span>
          </h2>
          {/* TABLE HEAD */}
          <div className='bg-white sticky top-0 grid grid-cols-6 text-[8px] md:text-xs lg:text-sm border-2 border-b-blue-500 border-t-blue-500 font-semibold'>
            <p className='col-span-2 p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 '>
              Name
            </p>
            <p className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 '>
              Phone No.
            </p>
            <p className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 '>
              Category
            </p>
            <p className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 '>
              DOB
            </p>
            <p className='p-1 lg:p-2 capitalize border border-l-0 border-t-0 border-b-0 '>
              Role
            </p>
          </div>
          <ol className=''>
            {members.map((member) => (
              <SingleMember key={member._id} {...member} />
            ))}
          </ol>
        </>
      )}
    </main>
  )
}

export default Members
