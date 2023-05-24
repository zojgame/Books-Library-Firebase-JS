import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { AppstoreOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

const items = [
    {label: 'Main page', key: '1', icon: <AppstoreOutlined />}
];

export const LayoutComponent = () => {
    const [collapsed, setCollapsed] = useState(true);

   return (
    <Layout className="layout">
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
      
    <Layout>
      <Header
        style={{
          padding: 0
        }}
      />

      <Content>
        <Outlet />        
      </Content>       
    </Layout>
  </Layout>);
};
