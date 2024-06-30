import { useState, useEffect } from "react"
import { FormRow, FormSelect } from "../../components"
import { redirect, useNavigation, useNavigate } from "react-router-dom"
import { titles, sex, role, category } from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useDashboardContext } from "../DashboardLayout"

const AddMember = () => {
  const { fetchTENs } = useDashboardContext()
  const [submitting, setSubmitting] = useState("")
  const [tenName, setTenName] = useState([])
  const navigate = useNavigate()

  const getTens = async () => {
    try {
      const tens = await fetchTENs()
      const tenNames = tens.map((ten) => ten.name)
      setTenName(tenNames)
    } catch (error) {
      return error
    }
  }
  console.log(tenName)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting("submitting")
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post("/member", data)
      toast.success("Member Created")
      navigate("/dashboard/members")
      setSubmitting("")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      setSubmitting("")
      return
    }
  }

  useEffect(() => {
    getTens()
  }, [])
  return (
    <div className='w-full p-5 lg:p-10'>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <h2 className='text-2xl mb-5'>Add Member</h2>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow
            type='text'
            name='firstName'
            labelText='first name'
            required
            minLength={3}
            extraStyle='capitalize'
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            required
            minLength={3}
            extraStyle='capitalize'
          />
          <FormRow
            type='text'
            name='middleName'
            labelText='middle name'
            required
            minLength={3}
            extraStyle='capitalize'
          />
          <FormRow
            type='tel'
            name='phoneNumber'
            labelText='phone number'
            required
            minLength={11}
            maxLength={11}
            extraStyle='capitalize'
          />
          <FormSelect
            name='title'
            list={Object.values(titles).sort()}
            labelText='title'
          />
          <FormRow type='email' name='email' labelText='email' required />
          <FormSelect
            name='sex'
            labelText='gender'
            list={Object.values(sex)}
            required
          />
          <FormRow type='date' name='DOB' labelText='date of birth' required />

          <FormRow
            type='text'
            name='address'
            labelText='address'
            required
            extraStyle='capitalize'
          />
          <FormSelect
            name='role'
            labelText='role'
            list={Object.values(role).sort()}
            required
          />
          <FormSelect
            name='category'
            labelText='category'
            list={Object.values(category).sort()}
            required
          />
          <FormSelect
            name='TEN'
            labelText='TEN'
            list={["NONE", ...tenName.sort()]}
            required
          />

          <button
            type='submit'
            className={`text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-300 ease-in-out duration-300 mt-7 p-[10px] ${
              submitting && "bg-indigo-200 cursor-wait"
            }`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMember
