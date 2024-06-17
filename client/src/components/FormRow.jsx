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
}) => {
  return (
    <div className='w-full mb-2 mt-2'>
      <label htmlFor={name} className='capitalize block'>
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
        className={`border border-blue-200 w-full rounded p-2 mt-1 outline-0 ${extraStyle}`}
      />
    </div>
  )
}

export default FormRow
