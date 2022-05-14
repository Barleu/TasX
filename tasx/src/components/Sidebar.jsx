import React from "react";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function Sidebar() {
  const isAdmin = true;

  return (
    <Layout.Sider collapsible>
      <div className="logo" />

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="sub1" icon={<TeamOutlined />} title="Teams">
          <div>Projects</div>
          {isAdmin && (
            <Menu.Item key="+team" icon={<PlusOutlined />} onClick={() => null}>
              Create new
            </Menu.Item>
          )}
        </SubMenu>
        <SubMenu key="sub2" icon={<CalendarOutlined />} title="Events">
          <div>Projects</div>
          {isAdmin && (
            <Menu.Item
              key="+event"
              icon={<PlusOutlined />}
              onClick={() => null}
            >
              Create new
            </Menu.Item>
          )}
        </SubMenu>
        {/* adaugare camp din baza de date dupa type-ul proiectului */}
        {isAdmin && (
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
        )}
      </Menu>
      <div>add a new team</div>
    </Layout.Sider>
  );
}

export default Sidebar;
