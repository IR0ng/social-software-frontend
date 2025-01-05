import { useMutation, useQuery } from '@tanstack/react-query'
import { IGetPostsResponse, INewPost, INewPostResponse } from './types'
import apiHandler from '~/api/api'
import { IErrorResponse } from '../types'

export const useNewPost = () => {
  return useMutation<INewPostResponse, IErrorResponse, INewPost>({
    mutationKey: ['newPost'],
    mutationFn: async (data: INewPost) => {
      const res = await apiHandler({
        method: 'POST',
        url: '/post/new',
        data,
      })

      return res.data
    },
  })
}

export const useGetSelfPosts = () => {
  return useQuery<IGetPostsResponse, IErrorResponse>({
    queryKey: ['selfPosts'],
    queryFn: async () => {
      try {
        const res = await apiHandler({
          method: 'GET',
          url: '/post/list/self',
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}

export const useGetPosts = () => {
  return useQuery<IGetPostsResponse, IErrorResponse>({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await apiHandler({
          method: 'GET',
          url: '/post/list/public',
        })

        return res.data
      } catch (error) {
        throw error
      }
    },
  })
}
