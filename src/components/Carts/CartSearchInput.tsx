import { memo } from 'react'

const CartSearchInput = ({ handleSearchValue, inputValue }: any) => {
  return (
    <div className='md:w-80 flex'>
      <input
        className='appearance-none border border-black rounded bg-gray-100 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhập vào đây'
        onChange={handleSearchValue}
        value={inputValue}
        autoComplete='off'
      />
    </div>
  )
}

export default memo(CartSearchInput)
