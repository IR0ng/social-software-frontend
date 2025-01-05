import { useMutation, useQuery } from '@tanstack/react-query'
import apiHandler from '~/api/api'
import { IAccount } from '~/containers/Login/types'
import {
  IActivityRecordsResponse,
  IGetUserInfoResponse,
  ILocation,
  ILoginResponse,
  INewActivity,
  ISignUpResponse,
  IUploadAvatarResult,
  IUser,
} from './types'
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
          url: '/user/login',
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
          url: '/user/sign-up',
          data,
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}

export const useNewActivity = () => {
  return useMutation<unknown, IErrorResponse, INewActivity>({
    mutationKey: ['newActivity'],
    mutationFn: async (data: INewActivity) => {
      try {
        const res = await apiHandler({
          method: 'POST',
          url: '/user/activity/new',
          data,
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}

export const useGetActivityRecords = () => {
  return useQuery<IActivityRecordsResponse, IErrorResponse>({
    queryKey: ['activityRecords'],
    queryFn: async (): Promise<IActivityRecordsResponse> => {
      try {
        const res = await apiHandler({
          method: 'GET',
          url: '/user/activity/records',
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
    staleTime: 0,
  })
}

export const useGetLocation = ({ latitude, longitude }: ILocation) => {
  return useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      try {
        const res = await apiHandler({
          method: 'GET',
          url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
    enabled: !!latitude || !!longitude,
  })
}

export const useGetUserInfo = () => {
  return useQuery<IUser, IErrorResponse>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await apiHandler<IGetUserInfoResponse>({
        method: 'GET',
        url: '/user/info/self',
      })

      return res.data.user
    },
  })
}

export const useGetUserInfoById = (userId: string) => {
  return useQuery<IGetUserInfoResponse, IErrorResponse>({
    queryKey: ['userInfo', userId],
    queryFn: async () => {
      const res = await apiHandler({
        method: 'GET',
        url: `/user/info/${userId}`,
      })

      return res.data
    },
  })
}
