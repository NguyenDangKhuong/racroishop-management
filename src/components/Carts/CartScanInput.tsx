import { memo, useCallback } from 'react'
import LoaderIcon from '../LoaderIcon'

const CartScanInput = ({ handleSearchValue, inputValue, scanLoading, scanFetching }: any) => {
  const scanInput = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])
  return (
    <div className='md:w-2/3 flex relative'>
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
      {scanLoading && scanFetching && <div className='absolute right-0 top-1'><LoaderIcon /></div>}
    </div>
  )
}

export default memo(CartScanInput)
