export interface IAccount {
  email: string
  password: string
}

export enum ERROR_RESPONSE {
  ACCOUNT_ERROR = 4002,
  UNKNOWN_ERROR = 5000,
}

export const ERROR_MESSAGE = {
  [ERROR_RESPONSE[ERROR_RESPONSE.ACCOUNT_ERROR]]: '電子信箱或密碼錯誤',
  [ERROR_RESPONSE[ERROR_RESPONSE.UNKNOWN_ERROR]]: '未知的錯誤，請稍後再嘗試',
}
