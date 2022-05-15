import React from "react";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function ProjectButton({ project }) {
  return (
    <Menu.Item key={project.id}>
      <Link to={`/project/${project.id}`}>{project.title}</Link>
    </Menu.Item>
    // link-uire catre baza de date: proiectele care sunt in baza de date vor aparea
    // sunt butonul de proiecte
  );
}

function Sidebar() {
  const isAdmin = true;

  const projects = [
    { id: 1, type: "TEAM", title: "Task 1" },
    { id: 2, type: "TEAM", title: "Task 2" },
    { id: 3, type: "TEAM", title: "Task 3" },
    { id: 4, type: "EVENT", title: "Event 1" },
    { id: 5, type: "EVENT", title: "Event 2" },
    { id: 6, type: "EVENT", title: "Event 3" },
  ];

  return (
    <Layout.Sider collapsible>
      <div className="logo" />

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="sub1" icon={<TeamOutlined />} title="Teams">
          {projects
            .filter((project) => project.type === "TEAM")
            .map((project) => (
              <ProjectButton project={project} key={project} />
            ))}

          {isAdmin && (
            <Menu.Item key="+team" icon={<PlusOutlined />} onClick={() => null}>
              Create new
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu key="sub2" icon={<CalendarOutlined />} title="Events">
          {projects
            .filter((project) => project.type === "EVENT")
            .map((project) => (
              <ProjectButton project={project} key={project.id} />
            ))}

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
