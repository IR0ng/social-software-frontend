import { FC, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import ErrorAlert from './ErrorAlert'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

const FormInput: FC<IFormInput> = ({ label, error, ...props }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex flex-row items-center gap-2">
        <label>{label}</label>
        {error && <ErrorAlert error={error} />}
      </div>
      <input
        className="rounded-lg border border-black py-2 pl-2 text-lg"
        {...props}
      />
    </div>
  )
}

export default FormInput
