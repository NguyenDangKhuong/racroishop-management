import { memo } from 'react'

const CartScanInput = ({ handleSearchValue, inputValue }: any) => {
  return (
    <div className='md:w-2/3'>
      <input
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhấp vào đây để quét mã số'
        onChange={handleSearchValue}
        value={inputValue}
        autoFocus
      />
    </div>
  )
}

export default memo(CartScanInput)
