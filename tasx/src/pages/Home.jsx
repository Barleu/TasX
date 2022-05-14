import React from "react";
import { Card, Row, Col, Checkbox } from "antd";

import PageLayout from "../components/PageLayout";

function Home() {
  const taskdone = [];
  const mytasks = [];

  const toggleTask = (taskId, val) => {
    console.log(taskId, val);
  };

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
                <tr>{task.title}</tr>
              ))}
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Tasks To Do" bordered={false} className="echipa-card">
              {mytasks?.map((task) => (
                <tr>
                  {" "}
                  {task.title}{" "}
                  <Checkbox
                    checked={task.completed}
                    style={{
                      margin: 15,
                    }}
                    onClick={() => toggleTask(task.id, !task.completed)}
                  />
                </tr>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

export default Home;
