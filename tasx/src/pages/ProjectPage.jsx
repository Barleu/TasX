import React from "react";
import { useParams } from "react-router";

import { Card, Col, Row, Button } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../firebase/config";
import PageLayout from "../components/PageLayout";

function ProjectPage() {
  const { projectId } = useParams();

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

  return (
    <PageLayout>
      <div className="site-card">
        <Row gutter={[50, 50]}>
          <Col span={12}>
            <Card
              title="Tasks to take"
              bordered={false}
              className="echipa-card"
              extra={""}
            >
              {tasks?.map((task) => (
                <Row gutter={20} style={{ marginBottom: "20px" }}>
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
      </div>
    </PageLayout>
  );
}

export default ProjectPage;
