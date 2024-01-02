import { Input } from 'antd'
import { useRef } from 'react'

const SearchInput = () => {
  const scanInput = useRef<HTMLInputElement>(null)
  const onIdle = () => {
    scanInput?.current?.focus()
  }

  useIdleTimer({ onIdle, timeout: 10_000 })
  return (
    <Input
      ref={scanInput}
      className='mb-5'
      allowClear
      autoFocus
      placeholder='Nhập mã sản phẩm'
    />

  )
}

export default SearchInput