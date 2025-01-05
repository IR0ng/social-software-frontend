import { useGetActivityRecords, useGetUserInfo } from '~/api/user'
import NavItem from './components/NavItem'
import NavButton from './components/NavButton'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import rootStore from '~/store'
import UserHeader from '../UserHeader'

const Navbar = () => {
  const {
    homeStore: { clearAuth },
  } = rootStore
  const router = useRouter()
  const { refetch } = useGetActivityRecords()
  const { data } = useGetUserInfo()
  return (
    <div className="flex h-full flex-col gap-10 border-r bg-gray-200 px-10 py-10">
      {router.pathname !== '/profile' && (
        <UserHeader avatar={data?.avatar} userName={data?.name} />
      )}
      <div className="flex flex-col gap-10 border-y border-gray-400 py-10">
        <NavItem href={'/'}>首頁</NavItem>
        <NavItem href={'/new-post'}>新增貼文</NavItem>
        <NavItem href={'/profile'}>個人頁面</NavItem>
        <NavItem href={'/activity'} onClick={() => refetch()}>
          帳號紀錄
        </NavItem>
      </div>

      <div className="">
        <NavButton
          onClick={() => {
            clearAuth()
            router.push('/login')
          }}
        >
          登出
        </NavButton>
      </div>
    </div>
  )
}

export default observer(Navbar)
