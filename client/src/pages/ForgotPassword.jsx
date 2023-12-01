import { FormRow } from "../components"
import { Form, Link, redirect } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { Logo } from "../components"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  try {
    await customFetch.patch("/auth/forgot-password", data)
    toast.success("successful")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

const ForgotPassword = () => {
  return (
    <div className='pb-[3rem] w-full h-full'>
      <div className='bg-white w-[90%] m-auto mt-[100px] rounded border-t-4 border-indigo-500 p-5 shadow-md shadow-slate-300 md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[150px] m-auto rounded-full bg-[whitesmoke] shadow-md mb-2' />
        <h2 className='text-center text-xl mb-10'>Reset Password</h2>
        <Form method='post'>
          <FormRow type='email' labelText='email' name='email' required />
          <FormRow
            type='password'
            labelText='password'
            name='password'
            required
          />
          <FormRow
            type='password'
            labelText='confirm password'
            name='confirmPassword'
            required
          />
          <button
            type='submit'
            className='text-white bg-indigo-500 w-full p-2 rounded mt-4 cursor-pointer hover:bg-blue-300 ease-in-out duration-300'
          >
            Submit
          </button>
          <p className='text-center mt-3 mb-3'>
            <Link to='/' className='text-green-600'>
              Home Page
            </Link>
          </p>
          <p className='text-center mt-3 mb-3'>
            <Link to='/login' className='text-green-600'>
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
