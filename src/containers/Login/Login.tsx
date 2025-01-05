import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ERROR_MESSAGE, ERROR_RESPONSE, IAccount } from './types'
import FormInput from '~/components/Form/FormInput'
import FormButton from '~/components/Form/FormButton'
import { joiResolver } from '@hookform/resolvers/joi'
import { accountSchema } from './validations'
import Form from '~/components/Form'
import { useGetLocation, useLogin, useNewActivity } from '~/api/user'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { E_ACTIVITY_TYPE, OS_TYPE_OBJ } from '../Activity/types'
import { osName } from 'react-device-detect'
import { useEffect, useState } from 'react'
import { ILocation } from '~/api/user/types'
import rootStore from '~/store'
import { observer } from 'mobx-react-lite'

const Login = () => {
  const router = useRouter()
  const {
    homeStore: { setAuth },
  } = rootStore
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAccount>({
    resolver: joiResolver(accountSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [location, setLocation] = useState<ILocation>({
    latitude: null,
    longitude: null,
  })
  const { isError, error, mutateAsync } = useLogin()
  const { mutate } = useNewActivity()
  const { data } = useGetLocation(location)

  const onSubmit: SubmitHandler<IAccount> = async (account) => {
    const res = await mutateAsync(account)
    if (res && data) {
      localStorage.setItem('token', res.token)
      setAuth({ token: res.token, userId: res.user.id })
      mutate({
        activityType: E_ACTIVITY_TYPE.LOGIN,
        osType: OS_TYPE_OBJ[osName],
        location: `${data.countryCode} / ${data.city}`,
      })
      router.push('/')
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert('請允許地理定位，僅用於記錄您的帳號登入地點。')
        } else {
          console.error('Error getting geolocation:', error.message)
        }
      }
    )
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-gray-100">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-2xl">登入</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="電子信箱"
              type="text"
              error={errors.email}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="密碼"
              type="password"
              error={errors.password}
              {...field}
            />
          )}
        />
        <div className="mt-10 flex flex-col items-center gap-1">
          {isError && (
            <p className="text-xs text-red-500">
              {ERROR_MESSAGE[ERROR_RESPONSE[error.code]]}
            </p>
          )}
          <FormButton
            disabled={!location.latitude || !location.longitude}
            type="submit"
          >
            登入
          </FormButton>
          <p className="text-xs">或</p>
          <Link className="text-xs text-blue-500" href={'/sign-up'}>
            按此註冊
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default observer(Login)
