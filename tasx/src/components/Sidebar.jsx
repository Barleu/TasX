import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Form, Input, Modal } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { firestore } from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useMe from "../hooks/useMe";

const { SubMenu } = Menu;

function Sidebar() {
  const me = useMe();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectType, setProjectType] = useState("");

  const showTeamModal = () => {
    setIsModalVisible(true);
    setProjectType("TEAM");
  };
  const showEventModal = () => {
    setIsModalVisible(true);
    setProjectType("EVENT");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const projectsRef = firestore.collection("projects");
  const query = projectsRef.limit(25);

  const [projects] = useCollectionData(query, { idField: "id" });
  const newCourseRef = firestore.collection("projects").doc();

  const onFinish = (values) => {
    console.log("Success:", values);
    newCourseRef.set({
      title: values.teamName,
      type: projectType,
    });
  };

  if (!projects) {
    return <p>loading</p>;
  }

  return (
    <Layout.Sider collapsible>
      <div className="logo" />

      <Menu theme="dark" mode="inline">
        <SubMenu key="teams" icon={<TeamOutlined />} title="Teams">
          {projects
            .filter((project) => project.type === "TEAM")
            .map((project) => (
              <Menu.Item key={project.id}>
                <Link to={`/project/${project.id}`}>{project.title}</Link>
              </Menu.Item>
            ))}

          {me.isAdmin && (
            <Menu.Item
              key="createTeam"
              icon={<PlusOutlined />}
              onClick={showTeamModal}
            >
              Create new
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu key="events" icon={<CalendarOutlined />} title="Events">
          {projects
            .filter((project) => project.type === "EVENT")
            .map((project) => (
              <Menu.Item key={project.id}>
                <Link to={`/project/${project.id}`}>{project.title}</Link>
              </Menu.Item>
            ))}

          {me.isAdmin && (
            <Menu.Item
              key="createEvent"
              icon={<PlusOutlined />}
              onClick={showEventModal}
            >
              Create new
            </Menu.Item>
          )}
        </SubMenu>

        {me.isAdmin && (
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to={`/users/`}>Users</Link>
          </Menu.Item>
        )}
      </Menu>

      <Modal
        title="Add a new team!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic" onFinish={onFinish} alignItems="center">
          <Form.Item
            label="Name of the team"
            name="teamName"
            rules={[{ required: true, message: "Add a new team!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Sider>
  );
}

export default Sidebar;
