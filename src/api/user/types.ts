export interface ILoginResponse {
  status: string
  msg: string
  token: string
  user: IUser
}

export interface IUser {
  id: number
  name: string
  gender: number
  email: string
  createdAt: string
  avatar: string
  introduction: string
}

export interface IUploadAvatarResult {
  status: number
  success: boolean
  data: {
    link: string
  }
}

export interface ISignUpResponse {
  newUser: NewUser
  status: string
  message: string
  token: string
}

export interface NewUser {
  name: string
  email: string
  avatar: string
  gender: number
  introduction: string
  id: number
  createdAt: string
}

export interface INewActivity {
  activityType: number
  osType: number
  location: string
}

export interface IActivityRecordsResponse {
  status: string
  total: number
  records: IRecord[]
}

export interface IRecord {
  id: number
  userId: number
  activityType: number
  osType: number
  location: string
  createdAt: string
}

export interface ILocation {
  latitude: number | null
  longitude: number | null
}
