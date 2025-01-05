interface IActivityObj {
  [key: number]: string
}

export enum E_ACTIVITY_TYPE {
  LOGIN = 0,
}

export const ACTIVITY_TYPE: IActivityObj = {
  [E_ACTIVITY_TYPE.LOGIN]: '登入',
}

export enum OS_TYPE {
  Windows = 0,
  Android = 1,
  Ios = 2,
  Unknown = 3,
}

export const OS_TYPE_OBJ: { [key: string]: number } = {
  Windows: 0,
  Android: 1,
  Ios: 2,
  Unknown: 3,
}
