import FormRow from "../FormRow"
import FormSelect from "../FormSelect"
import { category, role, titles } from "../../utils/constants"

function FilterMemberForm({ filterMembers }) {
  return (
    <div className='bg-white p-1 md:p-3 lg:p-5 rounded-md mt-5 mb-5'>
      <form
        className='grid md:grid-cols-3 lg:grid-cols-3 gap-1 md:gap-2 text-xs md:text-base'
        onSubmit={filterMembers}
      >
        <FormSelect
          type='text'
          name='title'
          labelText='title'
          required
          minLength={3}
          list={["", ...Object.values(titles)]}
          extraStyle='capitalize mt-0 mb-0'
        />
        <FormSelect
          type='text'
          name='category'
          labelText='category'
          required
          minLength={3}
          list={["", ...Object.values(category)]}
          extraStyle='capitalize mt-0 mb-0'
        />
        <FormSelect
          type='text'
          name='role'
          labelText='role'
          required
          minLength={3}
          list={["", ...Object.values(role)]}
          extraStyle='capitalize mt-0 mb-0'
        />

        <button
          type='submit'
          className={`text-white bg-indigo-500 rounded cursor-pointer hover:bg-blue-700 ease-in-out duration-300 mb-1 p-[10px]`}
        >
          Filter Result
        </button>
      </form>
    </div>
  )
}

export default FilterMemberForm
