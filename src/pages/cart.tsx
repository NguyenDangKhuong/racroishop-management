import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import CartInput from '../components/Carts/CartInput'
import CartListItem from '../components/Carts/CartListItem'
import CartSumary from '../components/Carts/CartSumary'
import useDebounce from '../hooks/useDebounce'
import { ProductCart } from '../models/ProductCart'
import { get } from '../utils/api'
import { currencyFormat } from './../utils/currencyFormat'

const Cart: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [cartList, setCartList] = useState<ProductCart[]>([])

  const debounedSearchValue = useDebounce(searchValue, 1000)

  const { data: product } = useQuery(
    ['searchProduct', debounedSearchValue],
    () => get(`/api/product/sku/${debounedSearchValue}`).then(res => res.data),
    {
      enabled: debounedSearchValue.length > 0
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
    const newCartList = existedProduct
      ? cartList.map(item =>
          item.product?._id === product._id
            ? { ...item, quantity: item.quantity! + 1 }
            : item
        )
      : [...cartList, { product, quantity: 1 }]
    product && setCartList(newCartList)
    setSearchValue('')
  }, [product])

  const onChangeSearchInput = useCallback(
    (e: any) => setSearchValue(e.target.value),
    [searchValue]
  )

  const totalCart: number = cartList.reduce(
    (acc, { quantity }) => acc + quantity!,
    0
  )

  const totalPrice: number = cartList.reduce(
    (acc, curr) => acc + curr.product?.price! * curr.quantity!,
    0
  )

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

  //print
  const componentRef: any = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true
  })

  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <div className='container mx-auto mt-5 select-none'>
        <CartInput
          inputValue={searchValue}
          handleSearchValue={onChangeSearchInput}
        />
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
            handlePrint={handlePrint}
          />
        </div>
      </div>
      <div className='mt-80 max-w-xs m-auto'>
        <div
          ref={componentRef}
          className='content-invoice flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mt-2 uppercase font-serif'>
            Yumy shop
          </h1>
          <div className='mt-2 text-sm text-center'>
            Địa chỉ: 223A, Nguyễn Văn Khạ, ấp Cây Sộp. Tân An Hội, Củ Chi, TPHCM
            <br />
            SĐT/Zalo : 0393.022.997 / 0966.813.400
          </div>
          <h2 className='text-xl font-bold mt-2'>Hóa đơn thanh toán</h2>
          <div>
            Thời gian:{' '}
            {`${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getUTCDate()}/${
              new Date().getUTCMonth() + 1
            }/${new Date().getUTCFullYear()}`}
          </div>

          <table className='table-auto mt-3 border-collapse border border-black'>
            <thead>
              <tr>
                <th className='border border-black p-1'>Tên</th>
                <th className='border border-black p-1'>Số lượng</th>
                <th className='border border-black p-1'>Đơn giá</th>
                <th className='border border-black p-1'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map(item => (
                <tr key={item.product?._id}>
                  <td className='border border-black text-left p-1'>{item.product?.name}</td>
                  <td className='border border-black text-right p-1'>{item.quantity}</td>
                  <td className='border border-black text-right p-1'>
                    {currencyFormat(item.product?.price!)}
                  </td>
                  <td className='border border-black text-right p-1'>
                    {currencyFormat(item!.quantity! * item.product?.price!)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className='border border-black border-t-4 text-left p-1'>Tổng</td>
                <td className='border border-black border-t-4 text-right p-1'>
                  {totalCart}
                </td>
                <td colSpan={2} className='border border-black border-t-4 text-right p-1'>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='mt-4'>Xin cảm ơn quý khách và hẹn gặp lại!</div>
        </div>
      </div>
    </>
  )
}

export default Cart
