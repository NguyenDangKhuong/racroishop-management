import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useDebounce from '../../hooks/useDebounce'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'
import { get, put, remove } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import BarcodeModal from '../BarcodeModal'
import ConfirmModal from '../ConfirmModal'
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

const pageSize = 30

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
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const mutationDelProduct = useMutation(
    (_id: string) => remove(`/api/product/${_id}`),
    {
      onSuccess: () => {
        mutate({ page: selectedPage })
        toast.warning('Sản phẩm đã được Xóa!')
        setEditingProduct(initialProduct)
      },
      onError: (err: any) => {
        toast.error(err.response.data)
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
      `/api/products?page=${value.page}&size=${pageSize}&name=${
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
          Đang tải...
        </div>
      )
    }
    if (isError) {
      return (
        <div className='text-center text-red-500'>
          Đã xảy ra lỗi, vui lòng liên hệ Khương
        </div>
      )
    }
    if (isSuccess) {
      return (
        <table className='table table-xs table-pin-rows table-pin-cols w-full'>
          <thead>
            <tr>
              <th>Hiển thị</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Mã số</th>
              <th>Sửa/Xóa</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item: Product) => (
              <tr key={item.sku} className='border-t'>
                <td>
                  <input type='checkbox' checked className='checkbox' />
                </td>
                <td>
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
                <td>
                  <span>{item.name}</span>
                </td>
                <td>{currencyFormat(item.price)}</td>
                <td>
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
                <td>
                  {String(
                    categories?.find(
                      (category: Category) => item.categoryId === category._id
                    )?.name
                  )}
                </td>
                <td>
                  <div
                    className='flex items-center text-blue-500 font-bold cursor-pointer'
                    onClick={() => {
                      setProductSelected(item)
                      setShowBarcodeModal(true)
                    }}>
                    {item.sku}
                  </div>
                </td>
                <td>
                  <i
                    className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
                    onClick={() => {
                      setEditingProduct(item)
                      setShowModal(true)
                    }}></i>
                  <i
                    className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
                    onClick={() => {
                      setEditingProduct(item)
                      setIsOpenConfirmModal(true)
                    }}></i>
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
            placeholder='Tìm tên sản phẩm '
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
                Danh sách sản phẩm: {totalDocs} sản phẩm
              </h3>
            </div>
            <span
              className='cursor-pointer'
              onClick={() => {
                setEditingProduct(initialProduct)
                setShowModal(true)
              }}>
              <i className='fas fa-plus text-lg text-emerald-500 mr-4'></i>Thêm
              Sản Phẩm
            </span>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>{renderResult()}</div>
        <Pagination
          totalPages={searchValue ? 0 : dataProducts?.totalPages}
          selectedPage={selectedPage}
          setSelectedPage={(val: number) => setSelectedPage(val)}
          totalDocs={totalDocs}
          pageSize={pageSize}
        />
        <ProductModal
          showModal={showModal}
          setShowModal={(val: boolean) => setShowModal(val)}
          editingProduct={editingProduct}
          categories={categories}
          setEditingProduct={(val: any) => setEditingProduct(val)}
          mutateProduct={() => mutate({ page: selectedPage })}
        />
        <ConfirmModal
          title='Xác nhận'
          content='Xác nhận bạn có muốn xóa sản phẩm này không'
          isOpen={isOpenConfirmModal}
          confirmHandler={() => {
            mutationDelProduct.mutate(editingProduct._id)
            setIsOpenConfirmModal(false)
          }}
          closeHandlder={() => setIsOpenConfirmModal(false)}
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
