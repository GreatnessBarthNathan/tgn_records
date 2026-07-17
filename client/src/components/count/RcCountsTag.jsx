/* eslint-disable react/prop-types */
import { useRcsCountsContext } from '../../pages/count/RcsCounts'
import SingleCountTag from './SingleCountTag'

const RcCountsTag = ({ styling }) => {
  const { rcs } = useRcsCountsContext()

  return (
    <div className={styling}>
      {rcs?.map((rc) => {
        return <SingleCountTag key={rc._id} {...rc} />
      })}
    </div>
  )
}

export default RcCountsTag
