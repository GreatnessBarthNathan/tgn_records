import { useDashboardContext } from "../pages/DashboardLayout"
import PageLink from "./PageLinks"
import { TbRelationManyToMany } from "react-icons/tb"
import { MdGroups, MdSettings } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import { PiStrategy } from "react-icons/pi"
import Logo from "./Logo"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaLayerGroup } from "react-icons/fa"
import { GrGroup } from "react-icons/gr"

const BigSidebar = () => {
  const { showBigSidebar, user } = useDashboardContext()

  return (
    // wrapper
    <div
      className={`
     hidden lg:block bg-white ${
       showBigSidebar
         ? "w-[20%] translate-x-0 opacity-1 h-full"
         : "w-[0px] translate-x-[-100%] opacity-0 h-0"
     } ease-in-out duration-300
      `}
    >
      {/* container */}
      <div className='h-full pt-[10px]'>
        {/* logo */}
        <Logo
          container='w-[50%] m-auto mb-[30px] bg-[whitesmoke] rounded-full border-2 border-indigo-500'
          image='w-full'
        />
        {/* links */}
        <div>
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
              icon={<FaLayerGroup />}
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
              icon={<FaPeopleGroup />}
            />
          )}
          {user.role === "user" && (
            <PageLink url='/dashboard/ten' text='TENs' icon={<GrGroup />} />
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

export default BigSidebar
