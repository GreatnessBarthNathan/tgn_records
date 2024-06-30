import { useEffect, useState } from "react"
import { FormRow } from "../../components"
import { Form, redirect, useNavigation, useParams } from "react-router-dom"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useDashboardContext } from "../DashboardLayout"

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/ten/${params.id}`, data)
    toast.success("TEN details Updated")

    return redirect(`/dashboard/ten`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const EditTEN = () => {
  const { fetchTENs } = useDashboardContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const [tenDetails, setTenDetails] = useState({
    name: "",
    leader: "",
    assistant: "",
    VIP: "",
    venue: "",
  })
  const { id } = useParams()

  const getTen = async () => {
    const tens = await fetchTENs()
    const singleTen = tens.find((ten) => ten._id === id)
    setTenDetails({
      ...tenDetails,
      name: singleTen.name,
      leader: singleTen.leader,
      assistant: singleTen.assistant,
      VIP: singleTen.VIP,
      venue: singleTen.venue,
    })
  }

  useEffect(() => {
    getTen()
  }, [])

  return (
    <div className='w-full p-5 lg:p-10'>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <h2 className='text-2xl mb-5 font-semibold'>EDIT TEN</h2>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow
            type='text'
            name='name'
            labelText='TEN Name'
            required
            value={tenDetails.name}
            onChange={(e) =>
              setTenDetails({ ...tenDetails, name: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='leader'
            labelText='TEN Leader'
            required
            value={tenDetails.leader}
            onChange={(e) =>
              setTenDetails({ ...tenDetails, leader: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='assistant'
            labelText='assistant'
            required
            value={tenDetails.assistant}
            onChange={(e) =>
              setTenDetails({ ...tenDetails, assistant: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='VIP'
            labelText='VIP'
            required
            value={tenDetails.VIP}
            onChange={(e) =>
              setTenDetails({ ...tenDetails, VIP: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='venue'
            labelText='venue'
            required
            value={tenDetails.venue}
            onChange={(e) =>
              setTenDetails({ ...tenDetails, venue: e.target.value })
            }
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

export default EditTEN
