import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row, Button, Modal, Form, Input, Popconfirm } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../firebase/config";
import PageLayout from "../components/PageLayout";
import useMe from "../hooks/useMe";

function ProjectPage() {
  const { projectId } = useParams();
  const history = useHistory();

  const me = useMe();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const tasksRef = firestore.collection("tasks");
  const tasksQuery = tasksRef
    .where("projectId", "==", projectId)
    .where("userId", "==", null);
  const [tasks] = useCollectionData(tasksQuery, { idField: "id" });

  const [user] = useAuthState(auth);

  const mytasksRef = firestore.collection("tasks");
  const myTasksQuery = mytasksRef
    .where("userId", "==", user?.uid)
    .where("projectId", "==", projectId);
  const [mytasks] = useCollectionData(myTasksQuery, { idField: "id" });

  const takeTask = (taskId) => {
    const taskRef = firestore.doc(`/tasks/${taskId}`);
    taskRef.update({ userId: user.uid });
  };

  const deleteTask = (taskId) => {
    const taskRef = firestore.doc(`/tasks/${taskId}`);
    taskRef.delete();
  };

  const deleteProject = () => {
    const projectRef = firestore.doc(`/projects/${projectId}`);
    projectRef.delete();
    history.push("/");
  };

  const showTaskModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const newTaskRef = firestore.collection("tasks").doc();

  const onFinish = (values) => {
    console.log("Success:", values);
    newTaskRef.set({
      title: values.taskName,
      completed: false,
      projectId: projectId,
      userId: null,
    });
  };

  return (
    <PageLayout>
      <div className="site-card">
        <Row gutter={[50, 50]}>
          <Col span={12}>
            <Card
              title="Tasks to take"
              bordered={false}
              className="echipa-card"
              extra={
                me.isAdmin && (
                  <Button
                    key="+task"
                    icon={<PlusOutlined />}
                    onClick={showTaskModal}
                    type="primary"
                    shape="rectangle"
                  >
                    New
                  </Button>
                )
              }
            >
              {tasks?.map((task) => (
                <Row
                  gutter={10}
                  style={{ marginBottom: "20px", flexWrap: "nowrap" }}
                >
                  <Col
                    style={{ flex: "1", display: "flex", alignItems: "center" }}
                  >
                    {task.title}
                  </Col>
                  <Col>
                    <Button type="primary" onClick={() => takeTask(task.id)}>
                      Take me
                    </Button>
                  </Col>
                  {me.isAdmin && (
                    <Col>
                      <Button danger onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </Col>
                  )}
                </Row>
              ))}
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title="Your Tasks in the Team"
              bordered={false}
              className="echipa-card"
            >
              {mytasks?.map((task) => (
                <div>{task.title}</div>
              ))}
            </Card>
          </Col>
        </Row>
        {me.isAdmin && (
          <div>
            <Popconfirm
              title="Are you sure to delete this record?"
              onConfirm={() => deleteProject()}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">Delete record</Button>
            </Popconfirm>
          </div>
        )}
      </div>

      <Modal
        title="Add a new task!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="basic" onFinish={onFinish} alignItems="center">
          <Form.Item
            label="Name of the task"
            name="taskName"
            rules={[{ required: true, message: "Add a new task!" }]}
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
    </PageLayout>
  );
}

export default ProjectPage;
