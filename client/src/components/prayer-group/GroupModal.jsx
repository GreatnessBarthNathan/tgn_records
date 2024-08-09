import { useState } from "react"
import { prayerGroups } from "../../utils/constants"
import { FaTimes } from "react-icons/fa"

function GroupModal({ prayerGroup, setPrayerGroup, setShowGroupModal }) {
  const [displayedGroup, setDisplayedGroup] = useState(prayerGroups)

  function selectName(e) {
    const leader = e.target.textContent
    const group = prayerGroups.find((group) => group.leader === leader)
    console.log(group)
    setPrayerGroup({
      ...prayerGroup,
      group: group.group,
      leader: group.leader,
      expectedCount: group.expectedCount,
    })
    setShowGroupModal(false)
  }

  function filterList(e) {
    const input = e.target.value
    const inputValue = input.toLowerCase()
    const filteredValue = prayerGroups.filter((group) => {
      if (inputValue === "") {
        return group
      } else if (group.leader.toLowerCase().includes(inputValue)) {
        return group
      }
    })
    setDisplayedGroup(filteredValue)
  }

  return (
    <main className='blured fixed top-0 left-0 w-full h-full p-5 md:p-10 flex items-center justify-center'>
      <section className='w-full md:w-[50%] bg-white h-[70%] overflow-hidden p-5 rounded-md relative'>
        <input
          type='text'
          autoFocus
          className='border w-full mb-2 p-2 rounded outline-none border-indigo-500'
          onChange={filterList}
          placeholder='search name'
        />
        <div className='h-[90%] overflow-auto'>
          {displayedGroup.map((group) => {
            return (
              <p
                key={group.group}
                className='hover:bg-blue-50 mb-1 leader p-1 cursor-pointer'
                onClick={selectName}
              >
                {group.leader}
              </p>
            )
          })}
        </div>
        <button
          className='absolute top-0 right-0 p-1'
          onClick={() => setShowGroupModal(false)}
        >
          <FaTimes />
        </button>
      </section>
    </main>
  )
}

export default GroupModal
