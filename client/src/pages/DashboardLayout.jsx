import { createContext, useContext, useState } from "react"
import {
  Navbar,
  SmallSidebar,
  BigSidebar,
  DashboardPages,
  Loading,
} from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom"

const DashboardContext = createContext()

export const loader = async () => {
  try {
    const {
      data: { user },
    } = await customFetch.get("/user/current-user")
    return user
  } catch (error) {
    return redirect("/")
  }
}

const DashboardLayout = () => {
  const user = useLoaderData()
  const [showBigSidebar, setShowBigSidebar] = useState(true)
  const [showSmallSidebar, setShowSmallSidebar] = useState(false)
  const navigate = useNavigate()
  const navigation = useNavigation()
  const [submitting, setSubmitting] = useState(false)

  const isLoading = navigation.state === "loading"

  const fetchTENs = async () => {
    try {
      const {
        data: { allTens },
      } = await customFetch.get("/ten")
      return allTens
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const {
        data: { members },
      } = await customFetch.get("/member")
      return members
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  // fetch group records
  const fetchGroupRecords = async () => {
    try {
      const {
        data: { groupRecords },
      } = await customFetch.get("/group-record")
      return groupRecords
    } catch (error) {
      return error
    }
  }

  // logout user
  const logout = async () => {
    try {
      await customFetch.get("/auth/logout")
      toast.success("logged out...")
      return navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  const values = {
    user,
    showBigSidebar,
    setShowBigSidebar,
    showSmallSidebar,
    setShowSmallSidebar,
    fetchMembers,
    fetchTENs,
    fetchGroupRecords,
    logout,
    submitting,
    setSubmitting,
  }
  return (
    <DashboardContext.Provider value={values}>
      <div className='relative h-[100dvh] flex items-center justify-center overflow-hidden'>
        {/* Big Sidebar */}
        <BigSidebar />

        {/* Navbar and Dashboard pages */}
        <div className={`w-[100%] h-full `}>
          <Navbar />
          {isLoading ? <Loading /> : <DashboardPages />}
        </div>

        {showSmallSidebar && <SmallSidebar />}
      </div>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  return useContext(DashboardContext)
}

export default DashboardLayout
