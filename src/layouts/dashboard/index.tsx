import { BookOutlined, DashboardOutlined, SettingFilled } from '@ant-design/icons'
import { router_keys } from '@routers/key'
import { Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
type DashboardLayoutProps = {}

const items = [
  {
    key: '/dashboard',
    label: <Link to={router_keys.dashboard}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: '/posts',
    label: <Link to={router_keys.posts}>Post Manager</Link>,
    icon: <BookOutlined />,
  },
  {
    key: '/settings',
    label: <Link to={router_keys.settings}>Settings</Link>,
    icon: <SettingFilled />,
  },
]

const DashboardLayout: React.FC<React.PropsWithChildren<DashboardLayoutProps>> = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
