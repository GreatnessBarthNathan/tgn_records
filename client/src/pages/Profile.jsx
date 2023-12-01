import { FormRow, FormSelect } from "../components"
import { Form, redirect, useNavigation } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { useDashboardContext } from "./DashboardLayout"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const {
      data: { user },
    } = await customFetch.get("/user/current-user")
    await customFetch.patch(`/user/${user._id}`, data)
    toast.success("profile updated")
    return redirect("/dashboard/add-count")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

const Profile = () => {
  const { user } = useDashboardContext()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  return (
    <div className='p-4'>
      <div className='bg-white p-5 py-10 md:p-10 rounded-md'>
        <h1 className='text-2xl md-2xl mb-5'>Profile</h1>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow
            type='text'
            name='firstName'
            labelText='first name'
            defaultValue={user.firstName}
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={user.lastName}
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='text'
            name='royalChapter'
            labelText='royal chapter'
            defaultValue={user.royalChapter}
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='text'
            name='location'
            labelText='location'
            defaultValue={user.location}
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='email'
            name='email'
            labelText='email'
            defaultValue={user.email}
            required
          />

          <button
            type='submit'
            className={`text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-2 ${
              isSubmitting && "bg-indigo-200 cursor-wait"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Profile
