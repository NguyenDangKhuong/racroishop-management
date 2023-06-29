import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useGenegateId } from '../../hooks/useGenegateId'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'
import { post, put } from '../../utils/api'
import { currencyFormat } from '../../utils/currencyFormat'
import ErrorMessage from '../ErrorMessage'
import LoaderIcon from '../LoaderIcon'
import { initialProduct } from '../ProductTable'

export default function ProductModal({
  showModal,
  setShowModal,
  editingProduct,
  setEditingProduct,
  categories,
  mutateProduct
}: {
  showModal: boolean
  setShowModal: any
  editingProduct: Product
  setEditingProduct: any
  categories: Category[]
  mutateProduct: any
}) {
  const isEditing = editingProduct._id

  const [imageUrl, setImageUrl] = useState(editingProduct.imageUrl || '')
  const [price, setPrice] = useState(0)
  const [imagePublicId, setImagePublicId] = useState(
    editingProduct.imagePublicId || ''
  )

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => handleCloseModal())

  const mutationPostProduct = useMutation(
    (newProduct: Product) => post('/api/product', newProduct),
    {
      onSuccess: res => {
        toast.success(res.data)
        handleCloseModal()
        mutateProduct()
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )
  const mutationPutProduct = useMutation(
    (updatedProduct: Product) => put('/api/product', updatedProduct),
    {
      onSuccess: res => {
        toast.success(res.data)
        handleCloseModal()
        mutateProduct()
      },
      onError: (err: any) => {
        toast.error(err.response.data)
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues
  } = useForm<Product>()

  const sku = useGenegateId(5)
  const tempName = useGenegateId(3)

  const onSubmit = handleSubmit(data =>
    isEditing
      ? mutationPutProduct.mutate({
          ...data,
          _id: editingProduct._id,
          price: Number(data.price),
          storage: Number(data.storage),
          imageUrl,
          imagePublicId
        })
      : mutationPostProduct.mutate({
          ...data,
          sku,
          price: Number(data.price),
          storage: Number(data.storage),
          imageUrl,
          imagePublicId
        })
  )

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'ndk',
        uploadPreset: 'yumyshop',
        folder: 'yumyshop/products'
      },
      (error: any, res: any) => {
        if (error) {
          console.error(error)
          return
        }
        if (res.event === 'success' && res.info.resource_type === 'image') {
          setImagePublicId(res.info.public_id)
          setImageUrl(res.info.url)
        }
      }
    )
    widget.open()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(initialProduct)
    setImageUrl('')
    setImagePublicId('')
    setPrice(0)
    reset()
  }

  useEffect(() => {
    const { name, price, storage, categoryId, imageUrl, imagePublicId } =
      editingProduct
    setValue('name', name)
    // @ts-ignore: Unreachable code error
    setValue('price', price ? Number(price) : '')
    // @ts-ignore: Unreachable code error
    setValue('storage', storage ? Number(storage) : '')
    setValue('categoryId', categoryId ? String(categoryId) : '')
    setValue('imageUrl', String(imageUrl))
    imageUrl && setImageUrl(imageUrl)
    imagePublicId && setImagePublicId(imagePublicId)
  }, [editingProduct])

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
                  <h3 className='text-3xl font-semibold'>{`${
                    isEditing ? 'Sửa' : 'Thêm'
                  } sản phẩm`}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => handleCloseModal()}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={onSubmit}>
                  {/*body*/}
                  <div className='relative p-6 flex-auto'>
                    <div className='mb-3 pt-0 flex'>
                      <input
                        type='text'
                        placeholder='Tên'
                        className='px-3 py-3 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        {...register('name', { required: 'Vui lòng nhập tên' })}
                      />
                      <div
                        className='btn ml-1'
                        onClick={() =>
                          getValues('categoryId') &&
                          setValue(
                            'name',
                            `${String(
                              categories.find(
                                ({ _id }) => _id === getValues('categoryId')
                              )?.name
                            )} ${tempName}`
                          )
                        }>
                        Tạo tên
                      </div>
                      {errors.name && (
                        <ErrorMessage
                          message={String(errors.name?.message)}></ErrorMessage>
                      )}
                    </div>
                    <div className='mb-3 pt-0'>
                      <input
                        type='number'
                        placeholder='Giá tiền'
                        className='px-3 py-3 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        {...register('price', {
                          required: 'Vui lòng nhập giá tiền',
                          onChange: e => setPrice(e.target.value)
                        })}
                      />
                      {errors.price && (
                        <ErrorMessage
                          message={String(
                            errors.price?.message
                          )}></ErrorMessage>
                      )}
                    </div>
                    {price > 0 && price < 999 && (
                      <div className='mb-3'>
                        <span
                          className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
                          onClick={() => setValue('price', price * 1000)}>
                          {currencyFormat(price * 1000)}
                        </span>
                        <span
                          className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
                          onClick={() => setValue('price', price * 10000)}>
                          {currencyFormat(price * 10000)}
                        </span>
                        <span
                          className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 cursor-pointer'
                          onClick={() => setValue('price', price * 100000)}>
                          {currencyFormat(price * 100000)}
                        </span>
                        <span
                          className='text-xs font-semibold inline-block py-1 px-2 rounded border text-gray-600 bg-gray-200 uppercase mr-1 mt-2 cursor-pointer'
                          onClick={() => setValue('price', price * 1000000)}>
                          {currencyFormat(price * 1000000)}
                        </span>
                      </div>
                    )}
                    <div className='mb-3 pt-0'>
                      <input
                        type='number'
                        placeholder='Số lượng'
                        className='px-3 py-3 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        {...register('storage', {
                          required: 'Vui lòng nhập số lượng'
                        })}
                      />
                      {errors.storage && (
                        <ErrorMessage
                          message={String(
                            errors.storage?.message
                          )}></ErrorMessage>
                      )}
                    </div>
                    <div className='mb-3 pt-0'>
                      <select
                        placeholder='Danh mục'
                        {...register('categoryId')}
                        className='px-3 py-3 border  placeholder-gray-300 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'>
                        <option value='' disabled>
                          Danh mục
                        </option>
                        {categories.map(item => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-3 pt-0'>
                      <input
                        value={imageUrl}
                        readOnly
                        placeholder='Hình ảnh'
                        className='cursor-pointer px-3 py-3 border placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                        onClick={openWidget}
                      />
                    </div>
                    <div className='mb-3 pt-0'>
                      <div>{imagePublicId}</div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => handleCloseModal()}>
                      Đóng
                    </button>
                    <button
                      type='submit'
                      className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                      {(mutationPostProduct.isLoading ||
                        mutationPutProduct.isLoading) && <LoaderIcon />}
                      {isEditing ? 'Sửa' : 'Thêm'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}
