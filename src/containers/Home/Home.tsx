import { useGetPosts } from '~/api/post'
import { useGetUserInfo } from '~/api/user'
import UserHeader from '~/components/UserHeader'

export default function Home() {
  useGetUserInfo()
  const { data } = useGetPosts()
  return (
    <div className="flex w-full flex-1 flex-col items-center p-10">
      <div className="flex w-full flex-1 flex-col gap-5">
        {data?.postList.map((post) => {
          return (
            <div
              className="flex flex-row items-center gap-1 rounded-lg bg-gray-300 px-2 py-1"
              key={post.id}
            >
              <UserHeader
                imageStyle="h-16 w-16"
                avatar={post.user.avatar}
                userName={post.user.name}
              />
              <div className="flex flex-1 flex-col gap-1">
                <div className="w-full rounded-t-lg border bg-gray-200 px-3 py-2">
                  {post.title}
                </div>
                <div className="w-full rounded-b-lg border bg-gray-200 px-5 py-2">
                  {post.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
