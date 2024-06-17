/* eslint-disable react/prop-types */
import { useRcsCountsContext } from "../../pages/count/RcsCounts"
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
