import { Product } from '@/models/Product';
import { get } from '@/utils/api';
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<Product> = [
  {
    title: 'Hiển thị',
    dataIndex: 'isPublic',
  },
  {
    title: 'Ảnh',
    dataIndex: 'imageUrl',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'storage',
  },
  {
    title: 'Danh mục',
    dataIndex: 'categoryId',
  },
  {
    title: 'Mã số',
    dataIndex: 'sku',
  },
  {
    title: 'Hành động',
  },
];

const data: Product[] = [
  {
    categoryId: "6334fe75ae69d070d72e7c08",
    imageUrl
      :
      "",
    name
      :
      "Đầm w70",
    price
      :
      260000,
    sku: "pazqf",
    storage: 5,
    _id: 'aaaaa',
    isPublic: true
  }
]

const ProductPage = async () => {
  const dataFetch = get('api/products')
  console.log(dataFetch)
  return (
    <Table bordered columns={columns} dataSource={data} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
  )
}

export default ProductPage