/* eslint-disable react/prop-types */

const FormRow = ({
  labelText,
  name,
  type,
  required,
  defaultValue,
  extraStyle,
  value,
  onChange,
  minLength,
  maxLength,
  readOnly,
  onClick,
}) => {
  return (
    <div className='w-full mt-1 mb-1'>
      <label
        htmlFor={name}
        className='capitalize block text-slate-500 font-semibold'
      >
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        readOnly={readOnly}
        onClick={onClick}
        className={`border border-blue-200 w-full rounded p-2 mt-1 outline-0 ${extraStyle}`}
      />
    </div>
  )
}

export default FormRow
