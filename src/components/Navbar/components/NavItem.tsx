import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, FC } from 'react'
import { cn } from '~/utils/classNames'

const NavItem: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({
  className,
  href,
  ...props
}) => {
  const router = useRouter()
  return (
    <Link
      className={cn([
        'px-10 py-2 pl-1 pr-20',
        {
          'border-b border-gray-400 text-blue-500': href === router.pathname,
        },
        className,
      ])}
      href={href}
      {...props}
    />
  )
}

export default NavItem
