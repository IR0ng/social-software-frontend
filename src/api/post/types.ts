import { IUser } from '../user/types'

export interface INewPost {
  title: string
  content: string
}

export interface INewPostResponse {
  status: string
  message: string
  newPost: Post
}

export interface Post {
  user: IUser
  title: string
  content: string
  userId: number
  id: number
  createdAt: string
  updatedAt: string
}

export interface IGetPostsResponse {
  status: string
  message: string
  postList: Post[]
  total: number
}
