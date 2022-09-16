import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Order } from '../../models/Order'
import { get } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'

const ListTable = () => {
  const {
    data: orders
  } = useQuery(['fetchOrders'], () =>
    get(`/api/orders/`).then(res => res.data.orders)
  )

  return (
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
              {format(parseISO(String(item?.createdAt!)), 'h:m:s dd/MM/yyyy')}
            </td>
            <td className='px-6 align-middle text-xs whitespace-nowrap p-4'></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListTable
