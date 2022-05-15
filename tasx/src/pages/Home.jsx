import React from "react";
import { Card, Row, Col, Checkbox } from "antd";
import { firestore } from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import PageLayout from "../components/PageLayout";

function Home() {
  const [user] = useAuthState(auth);

  const mytasksRef = firestore.collection("tasks");
  const myTasksQuery = mytasksRef.where("userId", "==", user?.uid);
  const [mytasks] = useCollectionData(myTasksQuery, { idField: "id" });

  const toggleTask = (taskId, val) => {
    const taskRef = firestore.doc(`/tasks/${taskId}`);
    taskRef.update({ completed: val });
  };

  const taskdoneRef = firestore.collection("tasks");
  const taskdoneQuery = taskdoneRef
    .where("completed", "==", true)
    .where("userId", "==", user?.uid);

  const [taskdone] = useCollectionData(taskdoneQuery, { idField: "id" });

  return (
    <PageLayout>
      <Card
        style={{
          textAlign: "center",
        }}
      >
        Motivation of the day 👉 Motivate yourself 👈
      </Card>

      <div className="site-card-wrapper">
        <Row gutter={[40, 16]}>
          <Col span={12}>
            <Card title="Tasks Done" bordered={false} className="echipa-card">
              {taskdone?.map((task) => (
                <div>{task.title}</div>
              ))}
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Tasks To Do" bordered={false} className="echipa-card">
              {mytasks?.map((task) => (
                <div>
                  {task.title}
                  <Checkbox
                    checked={task.completed}
                    style={{
                      margin: 15,
                    }}
                    onClick={() => toggleTask(task.id, !task.completed)}
                  />
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

export default Home;
