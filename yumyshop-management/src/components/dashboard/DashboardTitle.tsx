'use client'

import { Typography } from 'antd'

const { Title } = Typography
const DashboardTitle = ({ pageName, totalDocs }: { pageName: string, totalDocs: string }) => {
  return <Title level={5}>Danh sách {pageName} {totalDocs} {pageName}</Title>
}

export default DashboardTitle
