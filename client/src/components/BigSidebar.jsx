import { useDashboardContext } from "../pages/DashboardLayout"
import PageLink from "./PageLinks"
import { LuTally5 } from "react-icons/lu"
import { FaMoneyBill, FaBriefcase } from "react-icons/fa"
import { TbRelationManyToMany } from "react-icons/tb"
import { MdGroups, MdSettings } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import Logo from "./Logo"

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
          container='w-[50%] m-auto mb-[30px] bg-[whitesmoke] rounded-full shadow-md'
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
