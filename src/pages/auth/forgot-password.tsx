import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { post } from '../../utils/api'

const ForgotPassword = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<{
    email: string
  }>()

  const mutationForgotPassword = useMutation(
    (email: any) => post('/api/auth/forgotPassword', { email }),
    {
      onSuccess: (res: any) => {
        toast.success(res.data)
        router.push('/')
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )

  const onSubmit = handleSubmit(async data => {
    try {
      mutationForgotPassword.mutate(data.email)
    } catch (err) {
      console.error(err)
    }
  })
  return (
    <form className='form-control' onSubmit={onSubmit}>
      <div className='input-group'>
        <input
          type='text'
          placeholder='Vui lòng nhập email'
          className='input input-bordered'
          {...register('email', {
            required: 'Vui lòng nhập email'
          })}
        />
        <button className='btn btn-square'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default ForgotPassword
