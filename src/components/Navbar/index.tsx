import { useRouter } from 'next/router'
import NavItem from './components/NavItem'
import { ROUTER_PATH } from './types'

const Navbar = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <div className="flex h-full flex-col gap-10 border-r bg-gray-200 px-10 py-10">
      <NavItem
        href={'/'}
        className={
          ROUTER_PATH.HOME === router.pathname
            ? 'border-b border-black'
            : 'none'
        }
      >
        首頁
      </NavItem>
      <NavItem href={'/'}>搜索</NavItem>
      <NavItem href={'/'}>個人頁面</NavItem>
    </div>
  )
}

export default Navbar
