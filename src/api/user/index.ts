import { useMutation } from '@tanstack/react-query'
import apiHandler from '~/api/api'
import { IAccount } from '~/containers/Login/types'
import { ILoginResponse, ISignUpResponse, IUploadAvatarResult } from './types'
import { IErrorResponse } from '../types'
import axios from 'axios'
import { ISignUpData } from '~/containers/SignUp/types'
export const useLogin = () => {
  return useMutation<ILoginResponse, IErrorResponse, IAccount>({
    mutationKey: ['login'],
    mutationFn: async (account: IAccount): Promise<ILoginResponse> => {
      try {
        const res = await apiHandler({
          method: 'POST',
          url: '/api/user/login',
          data: account,
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ['uploadImage'],
    mutationFn: async (data: FormData) => {
      try {
        const res = await axios<IUploadAvatarResult>(
          'https://api.imgur.com/3/upload',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_TOKEN}`,
            },
            data,
          }
        )

        return res.data.data.link
      } catch (error) {
        throw error
      }
    },
  })
}

export const useSignUp = () => {
  return useMutation<ISignUpResponse, IErrorResponse, ISignUpData>({
    mutationKey: ['signUp'],
    mutationFn: async (data: ISignUpData): Promise<ISignUpResponse> => {
      try {
        const res = await apiHandler({
          method: 'POST',
          url: '/api/user/sign-up',
          data,
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}
