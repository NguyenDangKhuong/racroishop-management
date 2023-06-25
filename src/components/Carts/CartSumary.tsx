import { useMutation } from '@tanstack/react-query'
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
  addMoreList: number[]
  setAddMoreList: (list: number[]) => void
}> = ({
  totalCart,
  cartList,
  totalPrice,
  discountPrice,
  setDiscountPrice,
  customerCash,
  setCustomerCash,
  exchange,
  componentRef,
  addMoreList,
  setAddMoreList
}) => {
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
    <form
      onSubmit={onSubmit}
      id='summary'
      className='w-full md:w-1/4 px-8 py-5'>
      <div className='flex justify-between border-b pb-5'>
        <h1 className='font-semibold text-sm uppercase'>Tổng quan đơn hàng</h1>
        <div
          className='btn btn-xs bg-blue-500 flex'
          onClick={() => setAddMoreList([...addMoreList, 0])}>
          <i className='fas fa-plus text-white'></i>
        </div>
      </div>
      <div className='flex justify-between mt-5 mb-2'>
        <span className='font-semibold text-sm uppercase'>
          {totalCart} sản phẩm
        </span>
        <span
          className={`font-semibold text-sm ${
            discountPrice && 'line-through'
          }`}>
          {currencyFormat(totalPrice)}
        </span>
      </div>
      {addMoreList.map((item, idx) => (
        <div className='flex items-center mt-1' key={idx}>
          <input
            type='text'
            id='customerPrice'
            placeholder='Nhập số tiền thêm món'
            className='p-2 text-sm w-full border border-black rounded bg-gray-100 mr-3'
            value={item || ''}
            onChange={e => {
              setAddMoreList(
                addMoreList.map((itemx, index) =>
                  index === idx ? Number(e.target.value) : itemx
                )
              )
            }}
            autoComplete='off'
          />
          <i
            className='fa fa-minus text-red-600 text-sm cursor-pointer'
            onClick={() =>
              setAddMoreList(addMoreList.filter((_, index) => index !== idx))
            }></i>
        </div>
      ))}
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
      <div className='py-1'>
        <label
          htmlFor='customerPrice'
          className='font-semibold inline-block mb-1 text-sm uppercase text-blue-800'>
          Tiền khách đưa
        </label>
        <input
          type='text'
          id='customerPrice'
          placeholder='Nhập số tiền khách đưa'
          className='p-2 text-sm w-full border border-black rounded bg-gray-100'
          value={customerCash || ''}
          onChange={e => setCustomerCash(Number(e.target.value))}
          autoComplete='off'
        />
      </div>
      {customerCash > 0 && customerCash < 999 && (
        <div className='py-1'>
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
        </div>
      )}
      <div className='mt-1'>
        <label
          htmlFor='discountPrice'
          className='font-semibold inline-block mb-1 text-sm uppercase text-red-600'>
          Giảm giá (-)
        </label>
        <input
          type='text'
          id='discountPrice'
          placeholder='Nhập số tiền giảm giá'
          className='p-2 text-sm w-full border border-black rounded bg-gray-100'
          autoComplete='off'
          value={discountPrice || ''}
          onChange={e => setDiscountPrice(Number(e.target.value))}
        />
      </div>
      {discountPrice > 0 && discountPrice < 999 && (
        <div className='py-1'>
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
        </div>
      )}
      <div className='border-t border-black mt-3'>
        <div className='flex font-semibold justify-between py-2 text-xs uppercase'>
          <span>Tổng tiền đã giảm</span>
          <span>{currencyFormat(totalPrice - discountPrice)}</span>
        </div>
        <button
          className='bg-blue-500 font-semibold hover:bg-blue-600 py-2 text-sm text-white uppercase w-full flex justify-center item-center'
          type='submit'
          disabled={mutationPostOrder.isLoading}>
          {mutationPostOrder.isLoading && <LoaderIcon />}
          Thanh toán
        </button>
      </div>
      <div className='border-t mt-3'>
        <div className='flex font-semibold justify-between py-3 text-sm uppercase'>
          <span className='text-red-500'>Tiền thối</span>
          <span className='text-red-500 text-lg'>
            {totalPrice && currencyFormat(exchange)}
          </span>
        </div>
      </div>
    </form>
  )
}

export default CartSumary
