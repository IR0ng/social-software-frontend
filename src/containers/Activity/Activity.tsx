import { useGetActivityRecords } from '~/api/user'
import Record from './components/Record'

const Activity = () => {
  const { data } = useGetActivityRecords()

  return (
    <div className="flex flex-1 flex-col items-center py-10">
      <div>
        <label className="py-2 text-2xl">帳號活動紀錄：</label>
        <label className="py-2 text-2xl text-red-500">{data?.total} </label>
        <label className="py-2 text-2xl">筆</label>
      </div>
      <div className="flex w-full flex-1 flex-col gap-2 px-10 py-5">
        {data?.records.map((record) => {
          return <Record key={record.id} record={record} />
        })}
      </div>
    </div>
  )
}

export default Activity
