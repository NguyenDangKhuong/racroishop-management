'use client'

import { useState } from 'react'

import {
  DeleteTwoTone
} from '@ant-design/icons'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { Category } from '@/models/Category'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const initialCategory: Category = {
  _id: '',
  name: '',
}

const CartListItem = ({
  // totalDocs,
  // categories
}: {
    // totalDocs: number
    // categories: Category[]
  }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category>(initialCategory)
  const [isFetching, setIsFetching] = useState(false);

  const columns: ColumnsType<Category> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl'
    },
    {
      title: 'Tên',
      dataIndex: 'name'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price'
    },
    {
      title: 'Tổng',
      dataIndex: 'imageUrl'
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <DeleteTwoTone className='cursor-pointer' twoToneColor='#ff4d4f' />
      )
    }
  ]
  return (
    <>
      <Table
        rowKey='_id'
        loading={isFetching}
        bordered
        columns={columns}
        dataSource={[]}
        scroll={{ x: 800, y: 600 }}
      />
    </>
  )
}

export default CartListItem
