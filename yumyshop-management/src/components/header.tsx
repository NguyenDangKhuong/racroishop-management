// prettier-ignore
'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

// prettier-ignore

const items: MenuProps['items'] = [
  {
    label: <Link href={'/'}>Home Page</Link>,
    key: 'homepage',
    icon: <MailOutlined />
  },
  {
    label: <Link href={'/users'}>Manage Users</Link>,
    key: 'users',
    icon: <MailOutlined />
  },
  {
    label: <Link href={'/blogs'}>Manage Blogs</Link>,
    key: 'blogs',
    icon: <AppstoreOutlined />
  }
]

const Header: React.FC = () => {
  const [current, setCurrent] = useState('homepage')

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  )
}

export default Header
