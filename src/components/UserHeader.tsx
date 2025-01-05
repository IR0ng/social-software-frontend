import Image from 'next/image'
import UNKNOWN_USER_AVATAR from '@/unknown_use.png'
import { FC, HTMLAttributes } from 'react'
import { cn } from '~/utils/classNames'

interface IUserHeader extends HTMLAttributes<HTMLDivElement> {
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  imageStyle?: string
  avatar?: string
  userName?: string
}

const UserHeader: FC<IUserHeader> = ({
  fontSize = 'base',
  imageStyle,
  avatar,
  userName,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(['relative h-32 w-32', imageStyle])}>
        <Image
          className="rounded-full border"
          src={avatar || UNKNOWN_USER_AVATAR}
          alt={userName || 'unknown'}
          fill={true}
          objectFit="cover"
        />
      </div>
      <label className={`text-${fontSize}`}>{userName || 'unknown'}</label>
    </div>
  )
}

export default UserHeader
