import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';

const renderMenus = (menus) => {
  return menus.map(menu => {
    const { route, label, routes, ...others } = menu;
    if (routes?.length) {
      const resultMenus = renderMenus(routes);
      if (!resultMenus.length) {
        return null;
      }
      return (
        <Menu.SubMenu {...others} key={route}
          title={label}
        >
          {resultMenus}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item {...others} key={route}>
        {label}
      </Menu.Item>
    );
  });
}

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
          autoOpen
        >
          {renderMenus(routes)}
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}