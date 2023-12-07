import { Outlet } from "react-router-dom"

const DashboardPages = () => {
  return (
    <div className='h-[calc(100%-100px)] w-full overflow-auto shadow-inner'>
      <Outlet />
    </div>
  )
}

export default DashboardPages
