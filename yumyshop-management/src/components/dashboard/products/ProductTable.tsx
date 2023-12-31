'use client'

import { useState } from 'react'

import {
  DeleteTwoTone,
  EditTwoTone,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Checkbox, Divider, Flex, Image, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { Category } from '@/models/Category'
import { Product } from '@/models/Product'
import { currencyFormat } from '@/utils/currencyFormat'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ProductModal from './ProductModal'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

export const initialProduct: Product = {
  _id: '',
  name: '',
  price: 0,
  categoryId: '',
  sku: '',
  storage: 0,
  imageUrl: '',
  imagePublicId: ''
}

const ProductTable = ({
  totalDocs,
  products,
  categories
}: {
  totalDocs: number
  products: Product[]
  categories: Category[]
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product>(initialProduct)
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
      render: (_, record) => (
        <Image
          className='h-24 w-auto'
          src={record.imageUrl || '/image/product-placeholder.png'}
          alt={record.imageUrl}
          width={70}
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
        <Button type='primary'>
          {sku}
        </Button>
      )
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <EditTwoTone className='cursor-pointer' onClick={() => {
            setEditingProduct(record)
            setIsOpen(true)
          }} />
          <Divider type='vertical' />
          <DeleteTwoTone className='cursor-pointer' twoToneColor='#ff1500' onClick={() => {
            setEditingProduct(record)
          }} />
        </>
      )
    }
  ]
  return (
    <>
      <Flex className='mb-5' justify='flex-end'>
        <Button type='primary' onClick={() => {
          setEditingProduct(initialProduct)
          setIsOpen(true)
        }}> Thêm sản phẩm</Button>
      </Flex >
      <Table
        rowKey='_id'
        bordered
        columns={columns}
        dataSource={products}
        scroll={{ x: 800, y: 600 }}
        pagination={{
          current: Number(params.get('page')),
          pageSize: LIMIT_PAGE_NUMBER,
          hideOnSinglePage: true,
          total: totalDocs,
          showSizeChanger: true,
          onChange(page) {
            //change search param
            params.set('page', String(page));
            replace(`${pathname}?${params.toString()}`);
          },
        }}
      />
      <ProductModal isOpen={isOpen} setIsOpen={(value) => setIsOpen(value)}
        editingProduct={editingProduct} setEditingProduct={(val) => setEditingProduct(val)} categories={categories}
      />
    </>
  )
}

export default ProductTable
