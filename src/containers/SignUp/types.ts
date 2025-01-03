export interface ISignUpData {
  email: string
  password: string
  userName: string
  avatar: string
  introduction: string
  gender: string
}

export interface IGenderOptionType {
  value: string
  label: string
}

export enum ERROR_RESPONSE {
  ACCOUNT_ERROR = 4003,
  UNKNOWN_ERROR = 5000,
}

export const ERROR_MESSAGE = {
  [ERROR_RESPONSE[ERROR_RESPONSE.ACCOUNT_ERROR]]: '電子信箱或名稱已被使用',
  [ERROR_RESPONSE[ERROR_RESPONSE.UNKNOWN_ERROR]]: '未知的錯誤，請稍後再嘗試',
}
