import { memo } from 'react'

const CartSearchInput = ({ handleSearchValue, inputValue }: any) => {
  return (
    <div className='md:w-80 flex'>
      <input
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhập vào đây'
        onChange={handleSearchValue}
        value={inputValue}
      />
    </div>
  )
}

export default memo(CartSearchInput)
