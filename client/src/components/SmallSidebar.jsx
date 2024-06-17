import { FaTimes } from "react-icons/fa"
import { useDashboardContext } from "../pages/DashboardLayout"
import PageLink from "./PageLinks"
import { TbRelationManyToMany } from "react-icons/tb"
import { LuTally5 } from "react-icons/lu"
import { MdGroups, MdSettings } from "react-icons/md"
import { PiStrategy } from "react-icons/pi"
import { CgProfile, CgCommunity } from "react-icons/cg"
import Logo from "./Logo"

const SmallSidebar = () => {
  const { setShowSmallSidebar, user } = useDashboardContext()
  return (
    <div className='absolute top-0 left-0 w-full h-full m-auto flex items-center justify-center small-sidebar lg:hidden '>
      <div className='w-[95%] h-[95%] bg-white rounded relative overflow-auto'>
        <button
          className='absolute top-[20px] left-[20px] text-2xl text-red-600 '
          onClick={() => setShowSmallSidebar(false)}
        >
          <FaTimes />
        </button>
        <div
          className='ml-auto mr-auto w-3/4 mt-[100px] md:w-1/2'
          onClick={() => setShowSmallSidebar(false)}
        >
          <Logo
            container='w-[30%] m-auto mb-[25px] bg-[whitesmoke] rounded-full shadow-md'
            image='w-full'
          />
          {user.role === "user" && (
            <PageLink
              url='/dashboard/add-count'
              text='Add Count'
              icon={<MdGroups />}
            />
          )}
          {/* <PageLink
            url='/dashboard/add-finance'
            text='Add Finances'
            icon={<FaMoneyBill />}
          /> */}
          {user.role === "user" && (
            <PageLink
              url={`/dashboard/all-counts/${user._id}`}
              text='All Counts'
              icon={<LuTally5 />}
            />
          )}
          {/* <PageLink
            url='/dashboard/all-finances'
            text='All Finances'
            icon={<FaBriefcase />}
          /> */}
          {user.role === "admin" && (
            <PageLink
              url='/dashboard/rcs-counts'
              text='All RC-Counts'
              icon={<TbRelationManyToMany />}
            />
          )}
          {user.role === "user" && (
            <PageLink
              url='/dashboard/concept_strategy'
              text='Concept&Strategy'
              icon={<PiStrategy />}
            />
          )}
          {user.role === "user" && (
            <PageLink
              url='/dashboard/members'
              text='Membership'
              icon={<CgCommunity />}
            />
          )}
          <PageLink
            url={`/dashboard/profile/${user._id}`}
            text='Profile'
            icon={<CgProfile />}
          />
          <PageLink
            url={`/dashboard/settings/${user._id}`}
            text='Settings'
            icon={<MdSettings />}
          />
        </div>
      </div>
    </div>
  )
}

export default SmallSidebar
