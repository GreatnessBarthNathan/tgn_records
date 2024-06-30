import { useState, useEffect } from "react"
import { FormRow, FormSelect } from "../../components"
import { useParams, useNavigate } from "react-router-dom"
import {
  titles,
  sex,
  role,
  category,
  ROYAL_CHAPTER,
} from "../../utils/constants"
import customFetch from "../../utils/customFetch"
import { toast } from "react-toastify"
import { useDashboardContext } from "../DashboardLayout"

const EditMember = () => {
  const { fetchMembers, fetchTENs } = useDashboardContext()
  const [submitting, setSubmitting] = useState("")
  const [tenName, setTenName] = useState([])
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    sex: "",
    DOB: "",
    phoneNumber: "",
    title: "",
    email: "",
    address: "",
    role: "",
    category: "",
    royalChapter: "",
    TEN: "",
  })
  const navigate = useNavigate()
  const { id } = useParams()

  const getMember = async () => {
    try {
      const members = await fetchMembers()
      const member = members.find((member) => member._id === id)
      setMember({ ...member })

      const tens = await fetchTENs()
      const tenNames = tens.map((ten) => ten.name)
      setTenName(tenNames)
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting("submitting")
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    try {
      await customFetch.patch(`/member/${id}`, data)
      toast.success("Member Detail Updated")
      navigate("/dashboard/members")
      setSubmitting("")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      setSubmitting("")
      return
    }
  }

  useEffect(() => {
    getMember()
  }, [])

  return (
    <div className='w-full p-5 lg:p-10'>
      <div className='bg-white p-5 md:p-10 rounded shadow-md'>
        <h2 className='text-2xl mb-5'>Edit Member Details</h2>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'
        >
          <FormRow
            type='text'
            name='firstName'
            value={member.firstName}
            labelText='first name'
            required
            minLength={3}
            extraStyle='capitalize'
            onChange={(e) =>
              setMember({ ...member, firstName: e.target.value })
            }
          />
          <FormRow
            type='text'
            name='lastName'
            value={member.lastName}
            labelText='last name'
            required
            minLength={3}
            extraStyle='capitalize'
            onChange={(e) => setMember({ ...member, lastName: e.target.value })}
          />
          <FormRow
            type='text'
            name='middleName'
            value={member.middleName}
            onChange={(e) =>
              setMember({ ...member, middleName: e.target.value })
            }
            labelText='middle name'
            required
            minLength={3}
            extraStyle='capitalize'
          />
          <FormRow
            type='tel'
            name='phoneNumber'
            value={member.phoneNumber}
            onChange={(e) =>
              setMember({ ...member, phoneNumber: e.target.value })
            }
            labelText='phone number'
            required
            minLength={11}
            maxLength={11}
            extraStyle='capitalize'
          />
          <FormSelect
            name='title'
            value={member.title}
            list={Object.values(titles).sort()}
            labelText='title'
            onChange={(e) => setMember({ ...member, title: e.target.value })}
          />
          <FormRow
            type='email'
            name='email'
            labelText='email'
            required
            value={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
          />
          <FormSelect
            name='sex'
            labelText='gender'
            list={Object.values(sex)}
            required
            value={member.sex}
            onChange={(e) => setMember({ ...member, sex: e.target.value })}
          />
          <FormRow
            type='date'
            name='DOB'
            labelText='date of birth'
            required
            value={member.DOB}
            onChange={(e) => setMember({ ...member, DOB: e.target.value })}
          />

          <FormRow
            type='text'
            name='address'
            labelText='address'
            required
            extraStyle='capitalize'
            value={member.address}
            onChange={(e) => setMember({ ...member, address: e.target.value })}
          />
          <FormSelect
            name='role'
            labelText='role'
            value={member.role}
            onChange={(e) => setMember({ ...member, role: e.target.value })}
            list={Object.values(role).sort()}
            required
          />
          <FormSelect
            name='category'
            labelText='category'
            value={member.category}
            onChange={(e) => setMember({ ...member, category: e.target.value })}
            list={Object.values(category).sort()}
            required
          />
          <FormSelect
            name='royalChapter'
            labelText='royal chapter'
            value={member.royalChapter}
            onChange={(e) =>
              setMember({ ...member, royalChapter: e.target.value })
            }
            list={Object.values(ROYAL_CHAPTER).sort()}
            required
          />
          <FormSelect
            name='TEN'
            labelText='TEN'
            list={["NONE", ...tenName.sort()]}
            required
            value={member.TEN}
            onChange={(e) => setMember({ ...member, TEN: e.target.value })}
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

export default EditMember
