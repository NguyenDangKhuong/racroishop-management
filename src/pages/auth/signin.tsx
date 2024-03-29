import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import LoaderIcon from '../../components/LoaderIcon'

const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { status, data: session } = useSession()

  const { register, handleSubmit } = useForm<{
    email: string
    password: string
  }>()

  useEffect(() => {
    if (status === 'authenticated')
      session?.user.role === 0
        ? router.replace('/dashboard')
        : router.replace('/')
  }, [status])

  //submit next-auth
  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: session?.user.role === 0 ? '/dashboard' : '/',
        redirect: false
      })
      res?.ok
        ? toast.success('Đăng nhập thành công!', { autoClose: 500 })
        : toast.error(res?.error)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  })

  return (
    <section className='relative w-full h-full py-40 min-h-screen'>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0'>
              <div className='flex-auto px-4 lg:px-10 pt-10'>
                <div className='text-gray-500 text-center mb-3 font-bold uppercase'>
                  <span>Đăng nhập</span>
                </div>
                <form onSubmit={onSubmit}>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                      {...register('email', {
                        required: 'Vui lòng nhập email'
                      })}
                    />
                  </div>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'>
                      Password
                    </label>
                    <input
                      type='password'
                      className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                      {...register('password', {
                        required: 'Vui lòng nhập password'
                      })}
                    />
                  </div>
                  <div className='text-center mt-6'>
                    <button
                      type='submit'
                      className='bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'>
                      {isLoading && <LoaderIcon />}
                      Đăng nhập
                    </button>
                  </div>
                </form>
                <hr className='mt-6 border-b-1 border-gray-300' />
              </div>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-gray-500 text-sm font-bold'>
                    hoặc đăng kí với
                  </h6>
                </div>
                <div className='btn-wrapper text-center'>
                  <button
                    className='bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'>
                    <img
                      alt='...'
                      className='w-5 mr-1'
                      src='https://demos.creative-tim.com/notus-nextjs/img/github.svg'
                    />
                    Github
                  </button>
                  <button
                    className='bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150'
                    type='button'>
                    <img
                      alt='...'
                      className='w-5 mr-1'
                      src='https://demos.creative-tim.com/notus-nextjs/img/google.svg'
                    />
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
