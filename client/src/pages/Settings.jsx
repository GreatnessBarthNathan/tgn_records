import { FormRow } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { useNavigation } from "react-router-dom"

const Settings = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const submitForm = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    try {
      await customFetch.patch("/user/change-password", data)
      toast.success("password changed successfully")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <div className='p-4 md:p-10'>
      <div className='bg-white w-[90%] m-auto mt-[50px] rounded p-5 shadow-md shadow-slate-300 md:w-[50%] lg:w-[40%]'>
        <h1 className='mb-5 text-xl'>Change Password</h1>
        <form onSubmit={submitForm}>
          <FormRow
            type='password'
            labelText='old password'
            name='oldPassword'
          />
          <FormRow
            type='password'
            labelText='new password'
            name='newPassword'
          />
          <button
            type='submit'
            className={`bg-indigo-500 text-white w-full p-2 rounded mt-2 capitalize hover:bg-indigo-200 ${
              isSubmitting && "bg-indigo-200 cursor-wait"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
