import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDashboardContext } from "../DashboardLayout"
import { SingleTen, Loading } from "../../components"

function TEN() {
  const { fetchTENs } = useDashboardContext()
  const [allTens, setAllTens] = useState([])
  const [loading, setLoading] = useState(false)

  const getTens = async () => {
    setLoading(true)
    const tens = await fetchTENs()
    setAllTens(tens)
    setLoading(false)
  }

  useEffect(() => {
    getTens()
  }, [])
  return (
    <main className='p-2 md:p-5 lg:p-10'>
      <h1 className='text-base md:text-2xl lg:text-3xl font-bold mb-5'>
        EXPANSION NATIONS
      </h1>
      <div className='flex justify-between'>
        <h2 className='text-blue-700 text-base md:text-lg font-semibold '>
          {allTens.length} Results
        </h2>
        <Link
          to='../create-ten'
          className='bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-800 text-xs md:text-sm lg:text-base'
        >
          Add New TEN
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {allTens.length < 1 ? (
            <h1 className='text-center text-lg font-semibold'>
              No Records Found
            </h1>
          ) : (
            <div>
              {allTens.map((ten) => (
                <SingleTen key={ten._id} {...ten} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default TEN
