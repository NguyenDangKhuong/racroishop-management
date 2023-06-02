import { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import CartListItem from '../components/Carts/CartListItem'
import CartScanInput from '../components/Carts/CartScanInput'
import CartSumary from '../components/Carts/CartSumary'
import Html5QrcodePlugin from '../components/Html5QrcodePlugin'
import useDebounce from '../hooks/useDebounce'
import { ProductCart } from '../models/ProductCart'
import { get } from '../utils/api'
import { currencyFormat } from './../utils/currencyFormat'

const Cart: NextPage = () => {
  const [scanValue, setScanValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [discountPrice, setDiscountPrice] = useState(0)
  const [customerCash, setCustomerCash] = useState(0)
  const [cartList, setCartList] = useState<ProductCart[]>([])
  const [date, setDate] = useState('')

  const debounedScanValue = useDebounce(scanValue, isMobile ? 2000 : 0)

  const {
    data: product,
    isLoading: scanLoading,
    isFetching: scanFetching,
    refetch
  } = useQuery(
    ['searchProduct', debounedScanValue],
    () =>
      get(`/api/product/sku/${debounedScanValue || searchValue}`).then(
        res => res.data
      ),
    {
      enabled: debounedScanValue.length > (isMobile ? 4 : 0)
    }
  )

  const existedProduct = useMemo(
    () =>
      cartList.length > 0 &&
      product &&
      cartList.find(item => item.product?._id === product._id),
    [cartList, product]
  )

  useEffect(() => {
    setDate(format(new Date(), 'HH:mm - dd/MM/yyyy'))
  }, [])

  useEffect(() => {
    const newCartList = existedProduct
      ? cartList.map(item =>
          item.product?._id === product._id
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        )
      : [...cartList, { product, quantity: 1 }]
    product && setCartList(newCartList)
    setScanValue('')
    setSearchValue('')
  }, [product])

  const onChangeScanInput = useCallback(
    (e: any) => setScanValue(e.target.value),
    [scanValue]
  )

  // const onChangeSearchInput = useCallback(
  //   (e: any) => setSearchValue(e.target.value),
  //   [searchValue]
  // )

  const totalCart: number = cartList.reduce(
    (acc, { quantity }) => acc + quantity!,
    0
  )

  const totalPrice: number = cartList.reduce(
    (acc, curr) => acc + curr.product?.price! * curr.quantity!,
    0
  )

  const exchange =
    customerCash > 0 ? customerCash - totalPrice + discountPrice : 0

  // const renderResult = () => {
  //   if (isLoading) {
  //     return <div className='search-message'>Loading...</div>
  //   }
  //   if (isError) {
  //     return <div className='search-message'>Something went wrong</div>
  //   }
  //   if (isSuccess) {
  //     return (
  //       <CartListItem
  //         totalProduct={totalProduct}
  //         cartList={cartList}
  //         setProductList={(newProductList: Product[]) =>
  //           setProductList(newProductList)
  //         }
  //       />
  //     )
  //   }
  //   return <></>
  // }

  const componentRef: any = useRef()

  const onNewScanResult = (decodedText: any, decodedResult: any) => {
    setScanValue(decodedText)
  }

  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <div className='container mx-auto md:mt-5 select-none'>
        <Html5QrcodePlugin
          isMobile={isMobile}
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <div className='flex justify-between'>
          <CartScanInput
            inputValue={scanValue}
            handleSearchValue={onChangeScanInput}
            scanLoading={scanLoading}
            scanFetching={scanFetching}
          />
          {/* <CartSearchInput
            inputValue={searchValue}
            handleChangeSearchValue={onChangeSearchInput}
            handleClickSearchBtn={() => refetch()}
          /> */}
        </div>
        <div className='flex-col md:flex-row flex shadow-md my-5'>
          {/* {renderResult()} */}
          <CartListItem
            totalCart={totalCart}
            cartList={cartList}
            setCartList={(newProductList: ProductCart[]) =>
              setCartList(newProductList)
            }
          />
          <CartSumary
            totalCart={totalCart}
            cartList={cartList}
            totalPrice={totalPrice}
            discountPrice={discountPrice}
            setDiscountPrice={(price: number) => setDiscountPrice(price)}
            customerCash={customerCash}
            setCustomerCash={(cash: number) => setCustomerCash(cash)}
            exchange={exchange}
            componentRef={componentRef}
          />
        </div>
      </div>
      <div className='max-w-xs m-auto mt-40'>
        <div
          ref={componentRef}
          className='content-invoice flex flex-col justify-center items-center text-center text-[10px]'>
          <h1 className='text-[20px] font-bold mt-2 uppercase font-serif'>
            Yumy shop
          </h1>
          <div className='mt-1 text-center'>
            Đ/c: 223A Nguyễn Văn Khạ, ấp
            <br /> Cây Sộp, Tân An Hội, Củ Chi, TPHCM
            <br />
            SĐT: 0393.022.997
            <br />
            Zalo: 0966.813.400
          </div>
          <h2 className='text-sm font-bold mt-1'>Hóa đơn thanh toán</h2>
          <div>{`Thời gian: ${date}`}</div>
          <table className='table-auto mt-3 border-collapse border border-black'>
            <thead>
              <tr>
                <th className='border border-black text-[10px]'>Tên</th>
                <th className='border border-black text-[10px]'>SL</th>
                <th className='border border-black text-[10px]'>Đơn giá</th>
                <th className='border border-black text-[10px]'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map(item => (
                <tr key={item.product?._id}>
                  <td className='border border-black text-left text-[10px]'>
                    {item.product?.name}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {item.quantity}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item.product?.price!)}
                  </td>
                  <td className='border border-black text-right text-[10px]'>
                    {currencyFormat(item!.quantity! * item.product?.price!)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className='border border-black border-t-4 text-left text-[10px]'>
                  Tổng
                </td>
                <td className='border border-black border-t-4 text-right text-[10px]'>
                  {totalCart}
                </td>
                <td
                  colSpan={2}
                  className='border border-black border-t-4 text-right text-[10px]'>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
              {discountPrice > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Giảm giá{' '}
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {currencyFormat(discountPrice)}
                  </td>
                </tr>
              )}
              {discountPrice > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Tiền đã giảm
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {currencyFormat(totalPrice - discountPrice)}
                  </td>
                </tr>
              )}
              <tr>
                <td className='border border-black text-left text-[10px]'>
                  Khách đưa
                </td>
                <td
                  colSpan={3}
                  className='border border-black text-right text-[10px]'>
                  {customerCash ? currencyFormat(customerCash) : 0}
                </td>
              </tr>
              {exchange > 0 && (
                <tr>
                  <td className='border border-black text-left text-[10px]'>
                    Trả lại
                  </td>
                  <td
                    colSpan={3}
                    className='border border-black text-right text-[10px]'>
                    {exchange ? currencyFormat(exchange) : 0}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='mt-4 text-center text-[10px]'>
            Quý khách vui lòng kiểm tra hóa đơn <br /> trước khi rời shop
          </div>
          <div className='text-center text-[10px]'>
            Xin cảm ơn và hẹn gặp lại!
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
