'use client'

import { Typography } from 'antd'

const { Title } = Typography
const ProductTitle = ({ totalDocs }: { totalDocs: string }) => {
  return <Title level={5}>Danh sách sản phẩm: {totalDocs} sản phẩm</Title>
}

export default ProductTitle
