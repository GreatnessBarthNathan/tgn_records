import { useContext, createContext, useState, useEffect } from "react"
import customFetch from "../../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { RcCountsDetails } from "../../components"
import { toast } from "react-toastify"
import { months, days } from "../../utils/constants"

const RcsCountsContext = createContext()

export const loader = async () => {
  try {
    // get all users
    const {
      data: { users },
    } = await customFetch.get("/user")

    // get all count records
    const {
      data: { counts },
    } = await customFetch.get("/count/every-count")

    return { users, counts }
  } catch (error) {
    console.log(error)
    return error
  }
}

const RcsCounts = () => {
  const { users, counts } = useLoaderData()
  const [ids, setIds] = useState([])
  const [totals, setTotals] = useState({})
  const [rcCounts, setRcCounts] = useState(counts)

  const countDate = new Date(Date.now())
  const date = countDate.getDate()
  const day = countDate.getDay()
  const month = countDate.getMonth()
  const year = countDate.getFullYear()
  const [dateObj, setDateObj] = useState({ date, day, month, year })

  // get user ids
  const getUserId = () => {
    const ids = rcCounts.map((count) => {
      return count.user
    })
    setIds(ids)
  }

  // get totals
  const getTotals = () => {
    if (rcCounts.length === 0) {
      setTotals({})
    } else {
      rcCounts.reduce(
        (totalValue, value) => {
          const {
            males,
            females,
            children,
            converts,
            firstTimers,
            workForce,
            totalCount,
          } = value

          totalValue.males += males
          totalValue.females += females
          totalValue.children += children
          totalValue.converts += converts
          totalValue.firstTimers += firstTimers
          totalValue.workForce += workForce
          totalValue.totalCount += totalCount

          setTotals(totalValue)
          return totalValue
        },
        {
          males: 0,
          females: 0,
          children: 0,
          converts: 0,
          firstTimers: 0,
          workForce: 0,
          totalCount: 0,
        }
      )
    }
  }

  // search form
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { enteredAt } = Object.fromEntries(formData)
    const url = `/count/every-count?enteredAt=${enteredAt}`
    try {
      const {
        data: { counts },
      } = await customFetch.get(url)
      setRcCounts(counts)
      const countDate = new Date(enteredAt)
      const date = countDate.getDate()
      const day = countDate.getDay()
      const month = countDate.getMonth()
      const year = countDate.getFullYear()
      setDateObj({ date, day, month, year })
      getUserId()
      getTotals()
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUserId()
      getTotals()
    }, 500)

    return () => clearInterval(intervalId)
  })

  const values = { users, rcCounts, ids, totals }
  return (
    <RcsCountsContext.Provider value={values}>
      <div className='p-1 lg:p-10 w-full h-full'>
        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          className='flex w-[60%] lg:w-[40%] ml-auto mb-10 border border-indigo-500 rounded overflow-hidden h-[25px] md:h-[40px] items-center'
        >
          <input
            type='date'
            name='enteredAt'
            className='w-[80%] px-2 h-full text-sm'
            required
          />
          <button
            type='submit'
            className='bg-indigo-500 text-white w-[25%] h-full outline-0 text-xs md:text-sm px-1'
          >
            Search
          </button>
        </form>

        <h1 className='text-right font-semibold text-sm lg:text-2xl text-slate-700 mb-2 pr-3'>
          {days[dateObj.day]}, {months[dateObj.month]} {dateObj.date},{" "}
          {dateObj.year}
        </h1>
        <div className='flex justify-center space-x-2'>
          {/* <RcCountsTag styling='w-[15%] py-5 px-2 lg:block hidden' /> */}
          <RcCountsDetails />
        </div>
      </div>
    </RcsCountsContext.Provider>
  )
}

export const useRcsCountsContext = () => {
  return useContext(RcsCountsContext)
}

export default RcsCounts
