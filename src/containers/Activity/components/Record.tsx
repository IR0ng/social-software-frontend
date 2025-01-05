import { FC, HTMLAttributes } from 'react'
import { ACTIVITY_TYPE, OS_TYPE } from '../types'
import { IRecord } from '~/api/user/types'
import { format } from 'date-fns'

interface IRecordComponent extends HTMLAttributes<HTMLDivElement> {
  record: IRecord
}

const Record: FC<IRecordComponent> = ({ record, ...props }) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border-b bg-gray-100 p-4"
      {...props}
    >
      <label>活動類型： {ACTIVITY_TYPE[record.activityType]}</label>
      <label>裝置： {OS_TYPE[record.osType]}</label>
      <label>地點： {record.location}</label>
      <label>時間： {format(record.createdAt, 'yyyy/MM/dd hh:mm:ss')}</label>
    </div>
  )
}

export default Record
