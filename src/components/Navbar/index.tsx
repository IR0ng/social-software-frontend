import { useGetActivityRecords } from '~/api/user'
import NavItem from './components/NavItem'

const Navbar = () => {
  const { refetch } = useGetActivityRecords()
  return (
    <div className="flex h-full flex-col gap-10 border-r bg-gray-200 px-10 py-10">
      <NavItem href={'/'}>首頁</NavItem>
      <NavItem href={'/search'}>搜索</NavItem>
      <NavItem href={'/profile'}>個人頁面</NavItem>
      <NavItem href={'/activity'} onClick={() => refetch()}>
        帳號紀錄
      </NavItem>
    </div>
  )
}

export default Navbar
