import { useState, useEffect } from "react"
import { FormRow, FormSelect } from "../../components"
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom"
import { MEETING_TYPE } from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useDashboardContext } from "../DashboardLayout"

export const loader = async ({ params }) => {
  try {
    const {
      data: { count },
    } = await customFetch.get(`/count/${params.id}`)
    return count
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect("/login")
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/count/${params.id}`, data)
    const {
      data: { count },
    } = await customFetch.get(`/count/${params.id}`)
    toast.success("count record updated")
    return redirect(`/dashboard/all-counts/${count.user}`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect("/login")
  }
}

const EditCount = () => {
  const count = useLoaderData()
  const { user } = useDashboardContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const [inputs, setInputs] = useState({
    males: count.males,
    females: count.females,
    totalCount: count.totalCount,
  })

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
        <h2 className='text-2xl mb-5'>Edit Count Record</h2>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormSelect
            name='meetingType'
            defaultValue={count.meetingType}
            list={Object.values(MEETING_TYPE)}
            labelText='Meeting Type'
          />

          <FormRow
            type='number'
            name='firstTimers'
            labelText='first timers'
            defaultValue={count.firstTimers}
            required
          />
          <FormRow
            type='number'
            name='workForce'
            labelText='work force'
            defaultValue={count.workForce}
            required
          />
          <FormRow
            type='number'
            name='converts'
            labelText='converts'
            defaultValue={count.converts}
            required
          />
          <FormRow
            type='number'
            name='males'
            labelText='males'
            value={inputs.males}
            onChange={(e) => setInputs({ ...inputs, males: e.target.value })}
            required
          />
          <FormRow
            type='number'
            name='females'
            labelText='females'
            value={inputs.females}
            onChange={(e) => setInputs({ ...inputs, females: e.target.value })}
            required
          />
          <FormRow
            type='number'
            name='totalCount'
            labelText='total count'
            value={inputs.totalCount}
            onChange={() => setInputs({ ...inputs })}
            required
          />
          {user.role === "admin" && (
            <FormRow
              type='date'
              name='enteredAt'
              labelText='date'
              defaultValue={count.enteredAt}
              required
            />
          )}

          <button
            type='submit'
            className={`text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-2 ${
              isSubmitting && "cursor-wait bg-indigo-200"
            }`}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  )
}

export default EditCount
