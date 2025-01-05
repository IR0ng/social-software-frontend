import { observer } from 'mobx-react-lite'
import { useGetSelfPosts } from '~/api/post'
import { useGetUserInfo } from '~/api/user'
import UserHeader from '~/components/UserHeader'

const Profile = () => {
  const { data, isLoading } = useGetUserInfo()
  const { data: postData } = useGetSelfPosts()
  return (
    <div className="flex-1 p-10">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex w-full flex-col items-start gap-5 py-10">
          <UserHeader
            fontSize="2xl"
            avatar={data?.avatar}
            userName={data?.name}
          />
          <div className="border- w-full rounded-lg bg-gray-100 p-5 text-lg">
            {data!.introduction}
          </div>
        </div>
      )}
      <div className="border-t px-2 py-7">
        <label className="text-2xl">貼文： {postData?.total} 則</label>
        <div className="flex flex-1 flex-col gap-5 py-10">
          {postData?.postList.map((post) => {
            return (
              <div
                className="flex flex-col gap-1 rounded-lg bg-gray-300"
                key={post.id}
              >
                <div className="rounded-t-lg border bg-gray-200 px-3 py-2">
                  {post.title}
                </div>
                <div className="rounded-b-lg border bg-gray-200 px-5 py-2">
                  {post.content}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default observer(Profile)
