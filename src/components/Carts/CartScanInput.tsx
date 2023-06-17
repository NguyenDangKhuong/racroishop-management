import { memo, useRef } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import LoaderIcon from '../LoaderIcon'

const CartScanInput = ({
  handleSearchValue,
  inputValue,
  scanLoading,
  scanFetching
}: any) => {
  const scanInput = useRef<HTMLInputElement>(null)
  const onIdle = () => {
    scanInput?.current?.focus()
  }

  useIdleTimer({ onIdle, timeout: 10_000 })

  return (
    <div className='w-full px-5 md:px-0 md:flex relative'>
      <input
        className='appearance-none border border-black rounded bg-gray-100 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhấp vào đây để quét mã số'
        onChange={handleSearchValue}
        value={inputValue}
        ref={scanInput}
        autoFocus
        autoComplete='off'
      />
      {scanLoading && scanFetching && (
        <div className='absolute top-1'>
          <LoaderIcon />
        </div>
      )}
    </div>
  )
}

export default memo(CartScanInput)
