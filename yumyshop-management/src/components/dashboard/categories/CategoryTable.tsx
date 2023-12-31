'use client'

import { useEffect, useState } from 'react'

import {
  DeleteTwoTone,
  EditTwoTone
} from '@ant-design/icons'
import { Button, Divider, Flex, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { Category } from '@/models/Category'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CategoryModal from './CategoryModal'

export const initialCategory: Category = {
  _id: '',
  name: '',
}

const CategoryTable = ({
  totalDocs,
  categories
}: {
  totalDocs: number
  categories: Category[]
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category>(initialCategory)
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (categories) {
      setIsFetching(false)
    }
  }, [categories])
  const columns: ColumnsType<Category> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name'
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <EditTwoTone className='cursor-pointer' onClick={() => {
            setEditingCategory(record)
            setIsOpen(true)
          }} />
          <Divider type='vertical' />
          <DeleteTwoTone className='cursor-pointer' twoToneColor='#ff1500' onClick={() => {
            setEditingCategory(record)
          }} />
        </>
      )
    }
  ]
  return (
    <>
      <Flex className='mb-5' justify='flex-end'>
        <Button type='primary' onClick={() => {
          setEditingCategory(initialCategory)
          setIsOpen(true)
        }}>Thêm danh mục</Button>
      </Flex >
      <Table
        rowKey='_id'
        loading={isFetching}
        bordered
        columns={columns}
        dataSource={categories}
        scroll={{ x: 800, y: 600 }}
        pagination={{
          current: Number(params.get('page')) || 1,
          pageSize: LIMIT_PAGE_NUMBER,
          hideOnSinglePage: true,
          total: totalDocs,
          showSizeChanger: true,
          onChange(page) {
            params.set('page', String(page));
            replace(`${pathname}?${params.toString()}`);
            setIsFetching(true)
          },
        }}
      />
      <CategoryModal isOpen={isOpen} setIsOpen={(value) => setIsOpen(value)}
        editingCategory={editingCategory} setEditingCategory={(val) => setEditingCategory(val)} categories={categories}
      />
    </>
  )
}

export default CategoryTable
