import React from "react";
import { Layout, Menu, Space, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "../firebase/config";
import Sidebar from "./Sidebar";
import useMe from "../hooks/useMe";

const { Header, Content } = Layout;

function logout() {
  auth.signOut();
}

const menu = (
  <Menu>
    <Menu.Item key="logout" onClick={logout}>
      Log out
    </Menu.Item>
  </Menu>
);

function PageLayout({ children }) {
  const me = useMe();

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 45px 0 0 ",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            background: "#071829",
          }}
        >
          <Dropdown overlay={menu}>
            <Space size={10} style={{ color: "#fff", cursor: "default" }}>
              <UserOutlined />
              {me?.name ?? "User"}
            </Space>
          </Dropdown>
        </Header>

        <Content>
          <div className="card" />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
