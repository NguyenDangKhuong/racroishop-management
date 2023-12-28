'use client';
import { Layout, theme } from 'antd';
import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSider from './DashboardSider';

const { Content } = Layout;

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <DashboardSider collapsed={collapsed} />
      <Layout>
        <DashboardHeader collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
