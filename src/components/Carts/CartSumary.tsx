import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'
import { useGenegateId } from '../../hooks/useGenegateId'
import { Order } from '../../models/Order'
import { ProductCart } from '../../models/ProductCart'
import { post } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import LoaderIcon from '../LoaderIcon'

const CartSumary: React.FC<{
  totalCart: number
  cartList: ProductCart[]
  totalPrice: number
  discountPrice: number
  setDiscountPrice: any
  customerCash: number
  setCustomerCash: any
  exchange: number
  componentRef: any
}> = ({
  totalCart,
  cartList,
  totalPrice,
  discountPrice,
  setDiscountPrice,
  customerCash,
  setCustomerCash,
  exchange,
  componentRef
}) => {
  const [isPaid, setIsPaid] = useState(false)
  const mutationPostOrder = useMutation(
    (newOrder: Order) => post('/api/order', newOrder),
    {
      onSuccess: res => {
        toast.success(res.data)
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )

  const orderId = useGenegateId(6)

  const {
    handleSubmit,
    formState: { errors }
  } = useForm<Order>()

  const onSubmit = handleSubmit(() => {
    if (customerCash < 999) {
      toast.error('Tiền khách nhập phải lớn hơn 1000đ')
      return
    }
    handlePrint()
    setIsPaid(true)
  })

  //print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    onAfterPrint: () => {
      mutationPostOrder.mutate({
        orderId,
        totalPrice,
        totalCart,
        exchange,
        customerCash,
        products: cartList,
        discountPrice
      })
      window.location.reload()
    }
  })

  return (
    <form onSubmit={onSubmit} id='summary' className='w-1/4 px-8 py-5'>
      <h1 className='font-semibold text-2xl border-b pb-8'>
        Tổng quan đơn hàng
      </h1>
      <div className='flex justify-between mt-10 mb-5'>
        <span className='font-semibold text-sm uppercase'>
          {totalCart} sản phẩm
        </span>
        <span className='font-semibold text-sm'>
          {currencyFormat(totalPrice)}
        </span>
      </div>
      {/* <div>
        <label className='font-medium inline-block mb-3 text-sm uppercase'>
          Tiền ship
        </label>
        <select className='block p-2 text-gray-600 w-full text-sm'>
          <option>Giao hàng tiết kiệm 0 vnd</option>
        </select>
      </div> */}
      {/* <div className='py-10'>
        <label
          htmlFor='promo'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Mã giảm giá
        </label>
        <input
          type='text'
          id='promo'
          placeholder='Enter your code'
          className='p-2 text-sm w-full'
        />
      </div>
      <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
        Apply
      </button> */}
      <div className='py-5'>
        <label
          htmlFor='customerPrice'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Tiền khách đưa
        </label>
        <input
          type='text'
          id='customerPrice'
          placeholder='Nhập số tiền khách đưa'
          className='p-2 text-sm w-full bg-gray-200'
          value={customerCash || ''}
          onChange={e => setCustomerCash(Number(e.target.value))}
        />
      </div>
      {customerCash > 0 && customerCash < 999 && (
        <>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 1000)}>
            {currencyFormat(customerCash * 1000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 10000)}>
            {currencyFormat(customerCash * 10000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 100000)}>
            {currencyFormat(customerCash * 100000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 mt-2 cursor-pointer'
            onClick={() => setCustomerCash(customerCash * 1000000)}>
            {currencyFormat(customerCash * 1000000)}
          </span>
        </>
      )}
      <div className='border-t mt-5'>
        <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
          <span>Tổng tiền đã giảm</span>
          <span>{currencyFormat(totalPrice - discountPrice)}</span>
        </div>
        <button
          className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full flex justify-center item-center'
          type='submit'
          disabled={mutationPostOrder.isLoading || isPaid}>
          {mutationPostOrder.isLoading && <LoaderIcon />}
          Thanh toán
        </button>
      </div>
      <div className='border-t mt-8'>
        <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
          <span className='text-red-500'>Tiền thối</span>
          <span className='text-red-500'>{totalPrice && currencyFormat(exchange)}</span>
        </div>
      </div>
      <div className='border-t mt-5'>
        <label
          htmlFor='discountPrice'
          className='font-semibold inline-block mb-3 text-sm uppercase'>
          Giảm giá
        </label>
        <input
          type='text'
          id='discountPrice'
          placeholder='Nhập số tiền giảm giá'
          className='p-2 text-sm w-full bg-gray-200'
          value={discountPrice || ''}
          onChange={e => setDiscountPrice(Number(e.target.value))}
        />
      </div>
      {discountPrice > 0 && discountPrice < 999 && (
        <>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setDiscountPrice(discountPrice * 1000)}>
            {currencyFormat(discountPrice * 1000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setDiscountPrice(discountPrice * 10000)}>
            {currencyFormat(discountPrice * 10000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
            onClick={() => setDiscountPrice(discountPrice * 100000)}>
            {currencyFormat(discountPrice * 100000)}
          </span>
          <span
            className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 mt-2 cursor-pointer'
            onClick={() => setDiscountPrice(discountPrice * 1000000)}>
            {currencyFormat(discountPrice * 1000000)}
          </span>
        </>
      )}
    </form>
  )
}

export default CartSumary
