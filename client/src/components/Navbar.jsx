import { FaAlignLeft } from "react-icons/fa"
import { Logout, Logo } from "../components"
import { useDashboardContext } from "../pages/DashboardLayout"

const Navbar = () => {
  const {
    showBigSidebar,
    setShowBigSidebar,
    showSmallSidebar,
    setShowSmallSidebar,
  } = useDashboardContext()
  return (
    <div
      className={`flex justify-between items-center p-3 px-2 lg:px-5 h-[80px] md:h-[100px] bg-white w-full`}
    >
      <button
        className='text-xl md:text-3xl text-indigo-500 hover:text-indigo-800 ease-in-out duration-300'
        onClick={() => {
          setShowBigSidebar(!showBigSidebar)
          setShowSmallSidebar(!showSmallSidebar)
        }}
      >
        <FaAlignLeft />
      </button>
      <Logo
        container='w-[70px] md:w-[100px] block lg:hidden border border-indigo-500 rounded-full'
        image='w-full'
      />
      <h1 className='hidden lg:block text-3xl'>Dashboard</h1>
      <Logout />
    </div>
  )
}

export default Navbar
