import { useMutation } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Order } from '../../models/Order'
import { get } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'

registerLocale('vi', vi)

const ListTable = () => {
  const [selectDate, setSelectDate] = useState(new Date())
  const { data: orders, mutate } = useMutation((value: any) =>
    get(`/api/orders?selectDate=${value.date}&isMonth=${value.isMonth}`).then(
      (res: any) => res.data.orders
    )
  )

  return (
    <div>
      {/*body*/}
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
                mutate({date, isMonth: false})
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
                mutate({date, isMonth: true})
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
                {item.totalCart}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                {format(
                  parseISO(String(item?.createdAt!)),
                  'hh:mm:ss dd/MM/yyyy'
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'></td>
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
                {orders?.reduce(
                  (acc: number, curr: Order) => acc + curr.totalCart,
                  0
                )}
              </td>
              <td className='px-6 align-middle text-xs whitespace-nowrap p-4'></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ListTable
