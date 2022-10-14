import { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ProductCart } from '../../models/ProductCart'
import { currencyFormat } from '../../utils/currencyFormat'

const color = 'light'

export default function CategoryModal({
  showModal,
  setShowModal,
  listProduct
}: {
  showModal: boolean
  setShowModal: any
  listProduct: ProductCart[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => handleCloseModal())

  const handleCloseModal = () => {
    setShowModal(false)
  }
  console.log(listProduct)

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-3/4 lg:w-1/3 my-6 mx-auto'>
              {/*content*/}
              <div
                ref={ref}
                className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    Danh sách sản phẩm trong đơn hàng
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => handleCloseModal()}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <table className='items-center w-full bg-transparent border-collapse'>
                  <thead>
                    <tr>
                      <th
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                          (color === 'light'
                            ? 'bg-gray-50 text-gray-500 border-gray-100'
                            : 'bg-gray-600 text-gray-200 border-gray-500')
                        }>
                        Hình
                      </th>
                      <th
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                          (color === 'light'
                            ? 'bg-gray-50 text-gray-500 border-gray-100'
                            : 'bg-gray-600 text-gray-200 border-gray-500')
                        }>
                        Tên
                      </th>
                      <th
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                          (color === 'light'
                            ? 'bg-gray-50 text-gray-500 border-gray-100'
                            : 'bg-gray-600 text-gray-200 border-gray-500')
                        }>
                        Giá
                      </th>
                      <th
                        className={
                          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                          (color === 'light'
                            ? 'bg-gray-50 text-gray-500 border-gray-100'
                            : 'bg-gray-600 text-gray-200 border-gray-500')
                        }>
                        Số lượng mua
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct?.map((item: any) => (
                      <tr key={item._id} className='border-t'>
                        <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                          <img
                            className='h-24 w-auto'
                            src={
                              item.product.imageUrl ||
                              '/image/product-placeholder.png'
                            }
                            alt=''
                            // width={70}
                            // unoptimized={true}
                          />
                        </td>
                        <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                          <span>{item.product.name}</span>
                        </td>
                        <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                          <span>{currencyFormat(item.product.price)}</span>
                        </td>
                        <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                          <span>{item.quantity}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => handleCloseModal()}>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}
