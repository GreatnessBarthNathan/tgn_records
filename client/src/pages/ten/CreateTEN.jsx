import { FormRow } from "../../components"
import { Form, redirect, useNavigation } from "react-router-dom"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/ten", data)
    toast.success("New TEN Created")

    return redirect(`/dashboard/ten`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const CreateTEN = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div className='w-full p-5 lg:p-10'>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <h2 className='text-2xl mb-5 font-semibold'>NEW TEN</h2>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow type='text' name='name' labelText='TEN Name' required />
          <FormRow type='text' name='leader' labelText='TEN Leader' required />
          <FormRow
            type='text'
            name='assistant'
            labelText='assistant'
            required
          />
          <FormRow type='text' name='VIP' labelText='VIP' required />

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

export default CreateTEN
