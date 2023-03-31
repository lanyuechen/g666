import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';

export default (props) => {
  const { routes } = props;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{height: '100vh'}}>
      <Layout.Sider>
        <Menu
          selectedKeys={[location.pathname]}
          onClickMenuItem={(key) => navigate(key)}
        >
          {routes.map(route => (
            <Menu.Item key={route.path}>
              {route.label}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}