import { ButtonHTMLAttributes, FC } from 'react'

const FormButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="cursor-pointer rounded-lg border border-black px-10 py-2 text-lg"
      {...props}
    />
  )
}

export default FormButton
