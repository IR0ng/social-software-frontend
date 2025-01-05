import { makeObservable } from 'mobx'
import HomeStore from '~/containers/Home/store'

class RootStore {
  homeStore = new HomeStore()

  constructor() {
    makeObservable(this)
  }
}

const rootStore = new RootStore()
export default rootStore
