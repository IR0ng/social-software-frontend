import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Form from '~/components/Form'
import FormButton from '~/components/Form/FormButton'
import FormInput from '~/components/Form/FormInput'
import { ERROR_MESSAGE, ERROR_RESPONSE, ISignUpData } from './types'
import { useState } from 'react'
import UploadImageButton from '~/components/Form/UploadImageButton'
import { useSignUp, useUploadImage } from '~/api/user'
import { GENDER_OPTIONS } from './constant'
import Selector from '~/components/Form/Selector'
import { joiResolver } from '@hookform/resolvers/joi'
import { signUpSchema } from './validations'
import TextArea from '~/components/Form/TextArera'
import { useRouter } from 'next/router'

const SignUp = () => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { mutateAsync: signUpMutateAsync, isError, error } = useSignUp()
  const { mutateAsync: uploadImageMutateAsync } = useUploadImage()
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ISignUpData>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      gender: '',
      introduction: '',
    },
    resolver: joiResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<ISignUpData> = async (data) => {
    if (!selectedFile) {
      return setError('avatar', { type: 'required' })
    }

    const uploadData = new FormData()
    uploadData.append('image', selectedFile!)
    uploadData.append('album', process.env.NEXT_PUBLIC_IMGUR_ALBUM!)
    const avatarLink = await uploadImageMutateAsync(uploadData)
    if (avatarLink) {
      const res = await signUpMutateAsync({ ...data, avatar: avatarLink })
      if (res) {
        localStorage.setItem('token', res.token)
        router.push('/')
      }
    } else {
      setError('avatar', { type: 'required' })
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-gray-100">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-2xl">註冊</label>
        <UploadImageButton
          error={errors.avatar}
          selectedFile={selectedFile}
          setSelectedFile={(file: File) => {
            setSelectedFile(file)
            clearErrors('avatar')
          }}
        />
        <Controller
          name="userName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="使用者名稱"
              type="text"
              error={errors.userName}
              {...field}
            />
          )}
        />
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
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Selector
              label="性別"
              setValue={(value) => {
                setValue('gender', value)
                clearErrors('gender')
              }}
              options={GENDER_OPTIONS}
              value={field.value}
              error={errors.gender}
            />
          )}
        />
        <Controller
          name="introduction"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextArea label="自我介紹" error={errors.introduction} {...field} />
          )}
        />
        <div className="mt-10 flex flex-col items-center gap-1">
          {isError && (
            <p className="text-xs text-red-500">
              {ERROR_MESSAGE[ERROR_RESPONSE[error.code]]}
            </p>
          )}
          <FormButton type="submit">註冊</FormButton>
          <p className="text-xs">或</p>
          <Link className="text-xs text-blue-500" href={'/login'}>
            按此登入
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default SignUp
