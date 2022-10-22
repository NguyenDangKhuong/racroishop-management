import { memo, useCallback } from 'react'
import LoaderIcon from '../LoaderIcon'

const CartScanInput = ({ handleSearchValue, inputValue, scanLoading, scanFetching }: any) => {
  const scanInput = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])
  return (
    <div className='md:w-2/3 flex'>
      <input
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhấp vào đây để quét mã số'
        onChange={handleSearchValue}
        value={inputValue}
        ref={scanInput}
        autoFocus
      />
      {scanLoading && scanFetching && <LoaderIcon />}
    </div>
  )
}

export default memo(CartScanInput)
