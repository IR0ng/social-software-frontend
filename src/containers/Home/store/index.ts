import { makeAutoObservable } from 'mobx'
class HomeStore {
  token: string = ''
  userId: string = ''
  constructor() {
    makeAutoObservable(this)
  }

  setAuth = ({ token, userId }: { token: string; userId: number }) => {
    this.token = token
    this.userId = userId.toString()
  }

  clearAuth = () => {
    this.token = ''
    this.userId = ''
    localStorage.removeItem('token')
  }
}
export default HomeStore
