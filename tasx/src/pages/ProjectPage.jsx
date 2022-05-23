import React from "react";
import { useParams } from "react-router";

import { Card, Col, Row } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../firebase/config";
import PageLayout from "../components/PageLayout";

function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId;

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
                <div>{task.title}</div>
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
