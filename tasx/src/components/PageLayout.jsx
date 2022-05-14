import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
function logout() {
  // Add logout function
}

const menu = (
  <Menu>
    <Menu.Item onClick={logout}>logout</Menu.Item>
  </Menu>
);
function PageLayout(props) {
  const { children } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            <Button type="primary" shape="circle">
              <IconFont type="icon-tuichu" />
            </Button>
          </Dropdown>
        </Header>

        <Content style={{ margin: "0 16px" }}>
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
