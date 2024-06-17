import { useState, useEffect } from "react"
import { FormRow } from "../../components"
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"

export const loader = async () => {
  try {
    const {
      data: { members },
    } = await customFetch.get("/member")
    return members
  } catch (error) {
    return redirect("/dashboard/concept_strategy")
  }
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/concept_strategy", data)
    toast.success("suggestion added")

    return redirect(`/dashboard/concept_strategy`)
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const CreateConcept_Strategy = () => {
  const members = useLoaderData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const [inputs, setInputs] = useState({
    phoneNumber: "",
    name: "",
    TEN: "",
    suggestion: "",
  })

  const findMember = () => {
    if (inputs.phoneNumber.length === 11) {
      const member = members.find(
        (member) => member.phoneNumber === inputs.phoneNumber
      )
      setInputs({
        ...inputs,
        name: `${member.firstName + " " + member.lastName}`,
        TEN: member.TEN,
      })
    }
    if (inputs.phoneNumber.length < 11) {
      setInputs({ ...inputs, name: "", TEN: "" })
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      findMember()
    }, 500)
    return () => clearInterval(intervalID)
  })
  return (
    <div className='w-full p-2 md:p-5 lg:p-10'>
      <h2 className='text-base lg:text-3xl mb-5 font-bold'>Add Suggestion</h2>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <Form
          method='post'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow
            name='phoneNumber'
            type='tel'
            labelText='phone number'
            maxLength={11}
            value={inputs.phoneNumber}
            onChange={(e) =>
              setInputs({ ...inputs, phoneNumber: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='name'
            labelText='name'
            required
            readOnly
            value={inputs.name}
          />
          <FormRow
            type='text'
            name='TEN'
            labelText='TEN'
            required
            readOnly
            value={inputs.TEN}
          />
          <div className='md:col-span-2 lg:col-span-3'>
            <label htmlFor='suggestion' className='block'>
              Suggestion
            </label>
            <textarea
              name='suggestion'
              id='suggestion'
              rows='12'
              value={inputs.suggestion}
              required
              onChange={(e) =>
                setInputs({ ...inputs, suggestion: e.target.value })
              }
              placeholder='Enter suggestion here'
              className='border border-blue-200 w-full rounded p-2 mt-1 outline-0'
            />
          </div>
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

export default CreateConcept_Strategy
