export interface IPost {
  title: string
  content: string
}

export enum ERROR_RESPONSE {
  UNKNOWN_ERROR = 5000,
}

export const ERROR_MESSAGE = {
  [ERROR_RESPONSE[ERROR_RESPONSE.UNKNOWN_ERROR]]: '未知的錯誤，請稍後再嘗試',
}
