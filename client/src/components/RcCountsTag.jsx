import { useEffect, useState } from "react"
import { useRcsCountsContext } from "../pages/RcsCounts"
import SingleCountTag from "./SingleCountTag"

const RcCountsTag = ({ styling }) => {
  const { users } = useRcsCountsContext()

  return (
    <div className={styling}>
      {users.map((user) => {
        return <SingleCountTag key={user._id} {...user} />
      })}
    </div>
  )
}

export default RcCountsTag
