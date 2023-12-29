'use client'

import { useState } from 'react'

import {
  DeleteTwoTone,
  EditTwoTone,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Checkbox, Divider, Flex, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import { currencyFormat } from '@/utils/currencyFormat'

const ProductTable = ({
  products,
  categories
}: {
  products: Product[]
  categories: Category[]
}) => {
  const [showModal, setShowModal] = useState(false)
  const columns: ColumnsType<Product> = [
    {
      title: 'Hiển thị',
      dataIndex: 'isPublic',
      width: 100,
      render: (_, { isPublic }) => <Checkbox checked={isPublic} />
    },
    {
      title: 'Ảnh',
      dataIndex: 'imageUrl',
      width: 150,
      render: (_, { imageUrl }) => (
        <img
          className='h-24 w-auto'
          src={imageUrl || '/image/product-placeholder.png'}
          alt=''
          width={70}
          // unoptimized={true}
          // onClick={() => {
          //   setImageSelected(String(item.imageUrl))
          //   setShowImageModal(true)
          // }}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (_, { price }) => currencyFormat(price)
    },
    {
      title: 'Số lượng',
      dataIndex: 'storage',
      render: (_, { storage }) => (
        <Flex>
          <MinusOutlined className='cursor-pointer' />
          <span className='mx-2 px-2 py-1 bg-whiterounded text-sm shadow outline-none focus:outline-none focus:shadow-outline border w-16'>
            {storage}
          </span>
          <PlusOutlined className='cursor-pointer' />
        </Flex>
      )
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      width: 100,
      render: (_, { categoryId }) =>
        categories?.find((category: Category) => categoryId === category._id)
          ?.name
    },
    {
      title: 'Mã số',
      dataIndex: 'sku',
      render: (_, { sku }) => (
        <Button type='primary' onClick={() => {}}>
          {sku}
        </Button>
      )
    },
    {
      title: 'Hành động',
      render: () => (
        <>
          <EditTwoTone className='cursor-pointer' />
          {/* <i
          className='fas fa-edit text-lg text-emerald-500 mr-4 cursor-pointer'
          onClick={() => {
            setEditingProduct(item)
            setShowModal(true)
          }}></i> */}
          <Divider type='vertical' />
          <DeleteTwoTone className='cursor-pointer' twoToneColor='#ff1500' />
          {/* <i
          className='fas fa-close text-lg text-emerald-500 mr-2 cursor-pointer'
          onClick={() => {
            setEditingProduct(item)
            setIsOpenConfirmModal(true)
          }}></i> */}
        </>
      )
    }
  ]
  return (
    <Table
      rowKey='_id'
      bordered
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 20 }}
      scroll={{ x: 1000, y: 600 }}
    />
  )
}

export default ProductTable
