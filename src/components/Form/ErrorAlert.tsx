import { FC, HTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IErrorAlert extends HTMLAttributes<HTMLParagraphElement> {
  error: FieldError
}

const ErrorAlert: FC<IErrorAlert> = ({ error }) => {
  return <p className="text-sm text-red-400">{error.message}</p>
}

export default ErrorAlert
