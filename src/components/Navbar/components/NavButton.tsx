import { ButtonHTMLAttributes, FC } from 'react'

const NavButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="'px-10 pr-20' w-full rounded-lg border bg-gray-300 py-2 pl-1 text-center text-xl hover:border-gray-400 hover:bg-blue-100"
      {...props}
    />
  )
}

export default NavButton
