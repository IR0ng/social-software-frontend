import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ERROR_MESSAGE, ERROR_RESPONSE, IAccount } from './types'
import FormInput from '~/components/Form/FormInput'
import FormButton from '~/components/Form/FormButton'
import { joiResolver } from '@hookform/resolvers/joi'
import { accountSchema } from './validations'
import Form from '~/components/Form'
import { useLogin } from '~/api/user'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
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
  const { isError, error, mutateAsync } = useLogin()
  const onSubmit: SubmitHandler<IAccount> = async (account) => {
    const res = await mutateAsync(account)
    if (res) {
      localStorage.setItem('token', res.token)
      router.push('/')
    }
  }
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
          <FormButton type="submit">登入</FormButton>
          <p className="text-xs">或</p>
          <Link className="text-xs text-blue-500" href={'/sign-up'}>
            按此註冊
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
