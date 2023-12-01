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
    await customFetch.post("/auth/register", data)
    toast.success("Account created")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div className='pb-[3rem] w-full h-full'>
      <div className='bg-white w-[90%] m-auto mt-[50px] rounded border-t-4 border-indigo-500 p-5 shadow-md shadow-slate-300 md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[150px] m-auto rounded-full bg-[whitesmoke] shadow-md mb-2' />
        <h2 className='text-center text-xl mb-10'>Register</h2>
        <Form method='post'>
          <FormRow
            type='text'
            labelText='first name'
            name='firstName'
            required
          />
          <FormRow type='text' labelText='last name' name='lastName' required />
          <FormRow
            type='text'
            labelText='royal chapter'
            name='royalChapter'
            required
          />
          <FormRow type='text' labelText='location' name='location' required />
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
              isSubmitting && "bg-indigo-200 cursor-wait"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className='text-center mt-3 mb-3'>
            Already a member?{" "}
            <Link to='/login' className='text-green-600'>
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Register
