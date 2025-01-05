import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import FormInput from '~/components/Form/FormInput'
import { ERROR_MESSAGE, ERROR_RESPONSE, IPost } from './types'
import FormButton from '~/components/Form/FormButton'
import TextArea from '~/components/Form/TextArea'
import { joiResolver } from '@hookform/resolvers/joi'
import { postSchema } from './validations'
import { useNewPost } from '~/api/post'

const NewPost = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPost>({
    defaultValues: {
      title: '',
      content: '',
    },
    resolver: joiResolver(postSchema),
  })
  const { mutateAsync, error, isError } = useNewPost()
  const onSubmit: SubmitHandler<IPost> = async (data) => {
    const res = await mutateAsync(data)
    if (res.status === 'ok') {
      alert('貼文新增成功')
    }
    setValue('title', '')
    setValue('content', '')
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5 rounded-lg border border-black px-10 py-5"
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput error={errors.title} label="貼文標題" {...field} />
          )}
        />
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextArea
              error={errors.content}
              rows={10}
              cols={40}
              maxLength={500}
              label="貼文標題"
              {...field}
            />
          )}
        />
        {isError && (
          <p className="text-xs text-red-500">
            {ERROR_MESSAGE[ERROR_RESPONSE[error.code]]}
          </p>
        )}
        <FormButton type="submit">新增</FormButton>
      </form>
    </div>
  )
}

export default NewPost
