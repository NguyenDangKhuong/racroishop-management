import { useMutation } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { Order } from '../../models/Order'
import { ProductCart } from '../../models/ProductCart'
import { get } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import OrderModal from '../OrderModal'

registerLocale('vi', vi)

const ListTable = () => {
  const [selectDate, setSelectDate] = useState(new Date())
  const [listProduct, setListProduct] = useState<ProductCart[]>([])
  const [showModal, setShowModal] = useState(false)
  const [change, setChange] = useState(0)
  const {
    data: orders,
    mutate,
    isLoading: orderLoading
  } = useMutation(
    (value: any) =>
      get(`/api/orders?selectDate=${value.date}&isMonth=${value.isMonth}`).then(
        (res: any) => res.data.orders
      ),
    {
      onSuccess: res => {
        toast.success(res.data)
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )
  useEffect(() => mutate({ date: new Date(), isMonth: false }), [])

  return (
    <div>
      {/*body*/}
      <div>
        <div className='pb-3'>Nhập tiền thối đầu ngày:</div>
        <input
          type='number'
          placeholder='Nhập tiền thối'
          className='px-2 py-2 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-50'
        />
      </div>
      <div className='relative py-6 flex-auto'>
        <div className='mb-3 pt-0 flex items-center'>
          <div className='flex items-center justify-center'>
            <div className='w-40'>Chọn ngày:</div>
            <DatePicker
              className='border'
              locale='vi'
              dateFormat='dd/MM/yyyy'
              selected={selectDate}
              onChange={(date: Date) => {
                setSelectDate(date)
                mutate({ date, isMonth: false })
              }}
            />
          </div>
          hoặc
          <div className='flex items-center justify-center ml-4'>
            <div className='w-40'>Chọn tháng</div>
            <DatePicker
              className='border'
              locale='vi'
              dateFormat='MM/yyyy'
              showMonthYearPicker
              selected={selectDate}
              onChange={(date: Date) => {
                setSelectDate(date)
                mutate({ date, isMonth: true })
              }}
            />
          </div>
        </div>
      </div>
      <table className='items-center w-full bg-transparent border-collapse'>
        <thead>
          <tr>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Mã đơn hàng
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Tổng tiền
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Tiền khách đưa
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Tiền thối lại
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Giảm giá
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Tổng số sản phẩm
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Ngày bán
            </th>
            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100'
              }>
              Sản phẩm
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item: Order) => (
            <tr key={item._id} className='border-t'>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                {item.orderId}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                {currencyFormat(item.totalPrice)}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(item.customerCash)}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(item.exchange)}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(item.discountPrice)}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {item.totalCart}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {format(
                  parseISO(String(item?.createdAt!)),
                  'HH:mm:ss dd/MM/yyyy'
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                <i
                  className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
                  onClick={() => {
                    setListProduct(item.products)
                    setShowModal(true)
                  }}></i>
              </td>
            </tr>
          ))}
          {orders?.length > 0 && (
            <tr className='border-t bg-gray-400'>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                Tổng
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                {currencyFormat(
                  orders?.reduce(
                    (acc: number, curr: Order) => acc + curr.totalPrice,
                    0
                  )
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(
                  orders?.reduce(
                    (acc: number, curr: Order) => acc + curr.customerCash,
                    0
                  )
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(
                  orders?.reduce(
                    (acc: number, curr: Order) => acc + curr.exchange,
                    0
                  )
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {currencyFormat(
                  orders?.reduce(
                    (acc: number, curr: Order) => acc + curr.discountPrice,
                    0
                  )
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {orders?.reduce(
                  (acc: number, curr: Order) => acc + curr.totalCart,
                  0
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'></td>
            </tr>
          )}
          {orderLoading && (
            <tr className='w-full text-center py-5 border-t'>
              <td><i className='fas fa-spinner fa-spin animate-spin text-xl mr-2'></i></td>
              <td>Đang tải...</td>
            </tr>
          )}
        </tbody>
      </table>
      <OrderModal
        showModal={showModal}
        setShowModal={(val: boolean) => setShowModal(val)}
        listProduct={listProduct}
      />
    </div>
  )
}

export default ListTable
