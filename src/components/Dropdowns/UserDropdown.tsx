import { useRouter } from 'next/router'
import { createPopper } from '@popperjs/core'
import { useMutation } from '@tanstack/react-query'
import { createRef, useState } from 'react'
import { toast } from 'react-toastify'
import { get } from '../../utils/api'

const UserDropdown = () => {
  const router = useRouter()
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
  const btnDropdownRef: any = createRef()
  const popoverDropdownRef: any = createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-end'
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }

  const mutationLogout = useMutation(
    () => get('/api/logout').then(res => res.data),
    {
      onSuccess: res => {
        if (!res.isLoggedIn) router.push(`/login`)
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )

  return (
    <>
      <a
        className='text-gray-500 block'
        href='#'
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}>
        <div className='items-center flex'>
          <span className='w-12 h-12 text-sm text-white bg-gray-200 inline-flex items-center justify-center rounded-full'>
            {/* <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/team-1-800x800.jpg"
            /> */}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Action
        </a>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Another action
        </a>
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={e => e.preventDefault()}>
          Something else here
        </a>
        <div className='h-0 my-2 border border-solid border-gray-100' />
        <a
          href='#'
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700'
          }
          onClick={() => {
            mutationLogout.mutate()
          }}>
          Đăng xuất
        </a>
      </div>
    </>
  )
}

export default UserDropdown
