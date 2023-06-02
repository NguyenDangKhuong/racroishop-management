import { memo } from 'react'

const CartSearchInput = ({ handleChangeSearchValue, inputValue, handleClickSearchBtn }: any) => {
  return (
    <div className='w-full md:w-80 flex join'>
      <input
        className='input join-item appearance-none border border-black rounded-l-md rounded-r-none bg-gray-100 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
        id='inline-full-name'
        type='text'
        placeholder='Nhập vào đây'
        value={inputValue}
        onChange={handleChangeSearchValue}
        autoComplete='off'
      />
      <div
        className='join-item btn bg-blue-500 hover:bg-blue-600 rounded-r-md rounded-l-none'
        onClick={handleClickSearchBtn}>
        Tìm
      </div>
    </div>
  )
}

export default memo(CartSearchInput)
