import Link from 'next/link'

import {
  BarChartOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  TableOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { usePathname } from 'next/navigation'

const { Sider } = Layout

const DashboardSider = ({ collapsed }: any) => {
  const pathname = usePathname()
  return (
    <Sider
      trigger={null}
      collapsedWidth='0'
      breakpoint='lg'
      collapsible
      collapsed={collapsed}>
      <img className='bg-white mb-5 h-[65px] m-auto' src='/image/logo.png' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: '/carts',
            icon: <ShoppingCartOutlined />,
            label: <Link href='/carts'>Thanh toán</Link>
          },
          {
            key: '/products',
            icon: <TableOutlined />,
            label: <Link href='/products'>Sản phẩm</Link>
          },
          {
            key: '/categories',
            icon: <BookOutlined />,
            label: <Link href='/categories'>Danh mục</Link>
          },
          {
            key: '/orders',
            icon: <BarChartOutlined />,
            label: <Link href='/orders'>Thống kê</Link>
          }
        ]}
      />
    </Sider>
  )
}

export default DashboardSider
