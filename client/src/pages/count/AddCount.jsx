import { useState, useEffect } from "react"
import { FormRow, FormSelect } from "../../components"
import { Form, redirect, useNavigation } from "react-router-dom"
import { MEETING_TYPE } from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/count", data)
    toast.success("count record added")

    // get user id
    const {
      data: { user },
    } = await customFetch.get("/user/current-user")

    return redirect(`/dashboard/all-counts/${user._id}`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AddCount = () => {
  const [inputs, setInputs] = useState({
    males: "",
    females: "",
    totalCount: "",
  })
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const sum = () => {
    const total = Number(inputs.males) + Number(inputs.females)
    setInputs({ ...inputs, totalCount: total })
  }

  useEffect(() => {
    let intervalId = setInterval(() => {
      sum()
    }, 500)

    return () => clearInterval(intervalId)
  })

  return (
    <div className='w-full p-5 lg:p-10'>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <h2 className='text-2xl mb-5'>Add Count</h2>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormSelect
            name='meetingType'
            defaultValue={Object.values(MEETING_TYPE).NCR}
            list={Object.values(MEETING_TYPE)}
            labelText='Meeting Type'
          />
          <FormRow
            type='number'
            name='firstTimers'
            labelText='first timers'
            required
          />
          <FormRow
            type='number'
            name='workForce'
            labelText='work force'
            required
          />
          <FormRow
            type='number'
            name='converts'
            labelText='retained converts'
            required
          />
          <FormRow
            type='number'
            name='males'
            labelText='males'
            required
            value={inputs.males}
            onChange={(e) => setInputs({ ...inputs, males: e.target.value })}
          />
          <FormRow
            type='number'
            name='females'
            labelText='females'
            required
            value={inputs.females}
            onChange={(e) => setInputs({ ...inputs, females: e.target.value })}
          />
          <FormRow
            type='number'
            name='totalCount'
            labelText='total count'
            required
            value={inputs.totalCount}
            onChange={(e) => setInputs({ ...inputs })}
          />

          <button
            type='submit'
            className={`text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-2 ${
              isSubmitting && "bg-indigo-200 cursor-wait"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default AddCount
