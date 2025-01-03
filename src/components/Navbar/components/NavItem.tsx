import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'
import { cn } from '~/utils/classNames'

const NavItem: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({
  className,
  ...props
}) => {
  return (
    <Link className={cn(['px-10 py-2 pl-1 pr-20', className])} {...props} />
  )
}

export default NavItem
