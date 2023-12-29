import Link from 'next/link'

import {
  BarChartOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  TableOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const DashboardSider = ({ collapsed }: any) => {
  return (
    <Sider
      trigger={null}
      collapsedWidth='0'
      breakpoint='lg'
      collapsible
      collapsed={collapsed}>
      <div className='demo-logo-vertical' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <ShoppingCartOutlined />,
            label: <Link href='/cart'>Thanh toán</Link>
          },
          {
            key: '2',
            icon: <BarChartOutlined />,
            label: <Link href='/cart'>Thống kê</Link>
          },
          {
            key: '3',
            icon: <TableOutlined />,
            label: <Link href='/products'>Sản phẩm</Link>
          },
          {
            key: '4',
            icon: <BookOutlined />,
            label: 'Danh mục'
          }
        ]}
      />
    </Sider>
  )
}

export default DashboardSider
