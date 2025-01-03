import { FC, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import ErrorAlert from './ErrorAlert'

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: FieldError
}

const TextArea: FC<ITextArea> = ({ label, error, ...props }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center gap-2">
        <label>{label}</label>
        {error && <ErrorAlert error={error} />}
      </div>
      <textarea className="border border-black" {...props} />
    </div>
  )
}

export default TextArea
