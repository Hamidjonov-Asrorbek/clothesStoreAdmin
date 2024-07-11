import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Layout as LayoutCom, Menu, theme } from "antd";

const { Header: HeaderCom, Sider, Content } = LayoutCom;

const Layout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <LayoutCom>
      <Sider trigger={null} collapsible collapsed={collapsed} width={350}>
        <div className="demo-logo-vertical text-2xl font-bold text-center text-white py-5">
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            height: "100vh",
          }}
          defaultSelectedKeys={[
            location.pathname == "/" ? "dashboard" : location.pathname.slice(1),
          ]}
          items={[
            // {
            //   key: "title",
            //   label: (
            //     <h2 className="text-white text-center text-2xl pt-2">FN20</h2>
            //   ),
            //   disabled: true,
            // },
            {
              key: "dashboard",
              icon: <AppstoreOutlined style={{ zoom: 1.7 }} />,

              label: (
                <NavLink className="text-2xl" to={"/dashboard"}>
                  Dashboard
                </NavLink>
              ),
            },
            {
              key: "products",
              icon: <CalendarOutlined style={{ zoom: 1.7 }} />,
              label: (
                <NavLink className="text-2xl" to={"/products"}>
                  Products
                </NavLink>
              ),
            },
            //   {
            //     key: "sub1",
            //     icon: <AppstoreOutlined />,
            //     label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
            //   },
            //   {
            //     key: "sub2",
            //     icon: <SettingOutlined />,
            //     label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
            //   },
          ]}
        />
      </Sider>
      <LayoutCom>
        <HeaderCom
          className="flex items-center"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Header />
        </HeaderCom>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </LayoutCom>
    </LayoutCom>
  );
};

export default Layout;
