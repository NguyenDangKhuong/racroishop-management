import Link from 'next/link'
import { ProductCart } from '../../models/ProductCart'
import { currencyFormat } from '../../utils/currencyFormat'

const CartListItem: React.FC<{
  totalCart: number
  cartList: ProductCart[]
  setCartList: (newProductList: ProductCart[]) => void
}> = ({ totalCart, cartList, setCartList }) => {
  return (
    <div className='w-3/4 bg-white p-5'>
      <div className='flex justify-between border-b pb-8'>
        <h1 className='font-semibold text-2xl'>Giỏ hàng</h1>
        <h2 className='font-semibold text-2xl'>{totalCart} sản phẩm</h2>
      </div>
      <div className='flex mt-10 mb-5'>
        <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
          Chi tiết sản phẩm
        </h3>
        <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
          Số lượng
        </h3>
        <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
          Đơn Giá
        </h3>
        <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
          Tổng
        </h3>
      </div>
      {cartList.map(({ product, quantity }, index) => {
        const { _id, name, price, imageUrl } = product!
        const currProduct = cartList.find(item => item.product?._id === _id)
        return (
          <div
            key={`${_id}${index}`}
            className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div className='flex w-2/5'>
              <div className='w-20'>
                <img
                  className='h-24'
                  src={imageUrl || '/image/product-placeholder.png'}
                  // unoptimized={true}
                  alt=''
                />
              </div>
              <div className='flex flex-col justify-center space ml-4 flex-grow'>
                <span className='font-bold text-sm'>{name}</span>
                <div
                  onClick={() => {
                    setCartList(
                      cartList.filter(item => _id !== item.product?._id)
                    )
                  }}
                  className='font-semibold hover:text-red-500 text-red-500 text-xs cursor-pointer'>
                  Xóa
                </div>
              </div>
            </div>
            <div className='flex justify-center w-1/5'>
              <svg
                onClick={() =>
                  currProduct &&
                  setCartList(
                    currProduct.quantity! > 1
                      ? cartList.map(item =>
                          item.product?._id === _id
                            ? { ...item, quantity: item.quantity! - 1 }
                            : item
                        )
                      : cartList.filter(item => _id !== item.product?._id)
                  )
                }
                className='fill-current text-gray-600 w-3 cursor-pointer hover:text-blue-500'
                viewBox='0 0 448 512'>
                <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
              <input
                className='mx-2 border text-center w-8'
                type='text'
                value={quantity || 0}
                readOnly
              />
              <svg
                onClick={() => {
                  currProduct &&
                    setCartList(
                      cartList.map(item =>
                        item.product?._id === _id
                          ? { ...item, quantity: item.quantity! + 1 }
                          : item
                      )
                    )
                }}
                className='fill-current text-gray-600 w-3 cursor-pointer hover:text-blue-500'
                viewBox='0 0 448 512'>
                <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
            </div>
            <span className='text-center w-1/5 font-semibold text-sm'>
              {currencyFormat(price)}
            </span>
            <span className='text-center w-1/5 font-semibold text-sm'>
              {currencyFormat(price * quantity!)}
            </span>
          </div>
        )
      })}
      <Link href='/dashboard'>
        <a className='flex font-semibold text-indigo-600 text-sm mt-10 uppercase'>
          <svg
            className='fill-current mr-2 text-indigo-600 w-4'
            viewBox='0 0 448 512'>
            <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
          </svg>
          quay trở lại trang quản lí
        </a>
      </Link>
    </div>
  )
}

export default CartListItem
