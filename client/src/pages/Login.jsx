import React from "react"
import { FormRow } from "../components"
import { Form, Link, redirect, useNavigation } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { Logo } from "../components"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/auth/login", data)
    const {
      data: { user },
    } = await customFetch.get("/user/current-user")
    toast.success("welcome")
    if (user.role === "admin") {
      return redirect("/dashboard/rcs-counts")
    }
    return redirect("/dashboard/add-count")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div className='pb-[3rem] w-full h-full overflow-auto'>
      <div className='bg-white w-[90%] m-auto mt-[100px] rounded border-t-4 border-indigo-500 p-5 shadow-md shadow-slate-300 md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[150px] m-auto rounded-full bg-[whitesmoke] shadow-md mb-2' />
        <h2 className='text-center text-xl mb-10'>Login</h2>
        <Form method='post'>
          <FormRow type='email' labelText='email' name='email' required />
          <FormRow
            type='password'
            labelText='password'
            name='password'
            required
          />
          <button
            type='submit'
            className={`text-white bg-indigo-500 w-full p-2 rounded mt-4 cursor-pointer hover:bg-blue-300 ease-in-out duration-300 ${
              isSubmitting && "bg-indigo-300 cursor-wait"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className='text-center mt-3 mb-3'>
            Don't have an account?{" "}
            <Link to='/register' className='text-green-600'>
              Register
            </Link>
          </p>
          <p className='text-center mt-3 mb-3'>
            Forgot password?{" "}
            <Link to='/forgot-password' className='text-green-600'>
              Reset Password
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Login
