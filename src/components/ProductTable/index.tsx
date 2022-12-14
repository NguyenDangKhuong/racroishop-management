import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'
import { get, put, remove } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import BarcodeModal from '../BarcodeModal'
import Pagination from '../Pagination'
import ProductModal from '../ProductModal'
import ZoomImage from '../ZoomImage'

export const initialProduct = {
  _id: '',
  name: '',
  price: 0,
  sku: '',
  storage: 0,
  image: ''
}

const ProductTable = ({ color = 'light' }: { color?: string }) => {
  const [showModal, setShowModal] = useState(false)
  const [productSelected, setProductSelected] =
    useState<Product>(initialProduct)
  const [imageSelected, setImageSelected] = useState('')
  const [showBarcodeModal, setShowBarcodeModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product>(initialProduct)
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)

  const mutationDelProduct = useMutation(
    (_id: string) => remove(`/api/product/${_id}`),
    {
      onSuccess: () => {
        mutate({ page: selectedPage })
      }
    }
  )
  const debounedSearchValue = useDebounce(searchValue, 100)

  const {
    isLoading,
    isError,
    isSuccess,
    data: dataProducts,
    mutate
  } = useMutation(['fetchProducts', debounedSearchValue], (value: any) =>
    get(
      `/api/products?page=${value.page}&size=${30}&name=${
        debounedSearchValue ? debounedSearchValue : ''
      }`
    ).then(res => res.data)
  )

  const { data: categories } = useQuery(['fetchCategories'], () =>
    get(`/api/categories/`).then(res => res.data.categories)
  )

  useEffect(() => mutate({ page: 1 }), [])

  useEffect(
    () => mutate({ page: selectedPage }),
    [selectedPage, debounedSearchValue]
  )

  useEffect(() => {
    setProducts(dataProducts?.products)
    setTotalDocs(dataProducts?.totalDocs)
  }, [dataProducts])

  const mutationPutProduct = useMutation(
    (updatedProduct: Product) => put('/api/product', updatedProduct),
    {
      onSuccess: () => mutate({ page: selectedPage })
    }
  )

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className='text-center py-5 border-t'>
          <i className='fas fa-spinner fa-spin animate-spin text-xl mr-2'></i>
          ??ang t???i...
        </div>
      )
    }
    if (isError) {
      return (
        <div className='text-center text-red-500'>
          ???? x???y ra l???i, vui l??ng li??n h??? Kh????ng
        </div>
      )
    }
    if (isSuccess) {
      return (
        <table className='items-center w-full bg-transparent border-collapse select-text'>
          <thead>
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                ???nh
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                T??n
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                ????n gi??
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                S??? l?????ng
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                Danh m???c
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                M?? s???
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-gray-50 text-gray-500 border-gray-100'
                    : 'bg-gray-600 text-gray-200 border-gray-500')
                }>
                S???a/X??a
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item: Product) => (
              <tr key={item.sku} className='border-t'>
                <td className='pl-6 align-middle text-xs whitespace-nowrap py-4 text-left'>
                  <img
                    className='h-24 w-auto'
                    src={item.imageUrl || '/image/product-placeholder.png'}
                    alt=''
                    // width={70}
                    // unoptimized={true}
                    onClick={() => {
                      setImageSelected(String(item.imageUrl))
                      setShowImageModal(true)
                    }}
                  />
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4 text-left'>
                  <span>{item.name}</span>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  {currencyFormat(item.price)}
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <i
                    className='fas fa-minus text-lg text-emerald-500 cursor-pointer'
                    onClick={() =>
                      mutationPutProduct.mutate({
                        ...item,
                        storage: item.storage - 1
                      })
                    }></i>
                  <span className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'>
                    {item.storage}
                  </span>
                  <i
                    className='fas fa-plus text-lg text-emerald-500  cursor-pointer'
                    onClick={() =>
                      mutationPutProduct.mutate({
                        ...item,
                        storage: item.storage + 1
                      })
                    }></i>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  {String(
                    categories?.find(
                      (category: Category) => item.categoryId === category._id
                    )?.name
                  )}
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <div
                    className='flex items-center text-blue-500 font-bold cursor-pointer'
                    onClick={() => {
                      setProductSelected(item)
                      setShowBarcodeModal(true)
                    }}>
                    {item.sku}
                  </div>
                </td>
                <td className='px-6 align-middle text-xs whitespace-nowrap p-4'>
                  <i
                    className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
                    onClick={() => {
                      setEditingProduct(item)
                      setShowModal(true)
                    }}></i>
                  <i
                    className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
                    onClick={() => mutationDelProduct.mutate(item._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    return <></>
  }

  return (
    <>
      {/* Form */}
      <form className='md:flex flex-row flex-wrap items-center lg:ml-auto mb-5'>
        <div className='relative flex md:w-full w-80 flex-wrap items-stretch'>
          <span className='z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
            <i className='fas fa-search'></i>
          </span>
          <input
            type='text'
            placeholder='T??m t??n s???n ph???m '
            className='border px-3 py-3 placeholder-gray-500 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-1/3 pl-10'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </form>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-gray-700 text-white')
        }>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-gray-700' : 'text-white')
                }>
                Danh s??ch s???n ph???m: {totalDocs} s???n ph???m
              </h3>
            </div>
            <span className='cursor-pointer' onClick={() => setShowModal(true)}>
              <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Th??m
              S???n Ph???m
            </span>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>{renderResult()}</div>
        <Pagination
          totalPages={searchValue ? 0 : dataProducts?.totalPages}
          selectedPage={selectedPage}
          setSelectedPage={(val: number) => setSelectedPage(val)}
        />
        <ProductModal
          showModal={showModal}
          setShowModal={(val: boolean) => setShowModal(val)}
          editingProduct={editingProduct}
          categories={categories}
          setEditingProduct={(val: any) => setEditingProduct(val)}
          mutateProduct={() => mutate({ page: selectedPage })}
        />
        <BarcodeModal
          productSelected={productSelected}
          showBarcodeModal={showBarcodeModal}
          setShowBarcodeModal={(val: boolean) => setShowBarcodeModal(val)}
        />
        <ZoomImage
          imageSelected={imageSelected}
          showImageModal={showImageModal}
          setShowImageModal={(val: boolean) => setShowImageModal(val)}
        />
      </div>
    </>
  )
}

export default ProductTable
