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
