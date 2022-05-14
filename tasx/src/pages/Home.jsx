import React from "react";
import { Card, Row, Col } from "antd";

import PageLayout from "../components/PageLayout";

function Home() {
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
          <Col span={5}>tasks done</Col>

          <Col span={32}>todo</Col>
        </Row>
      </div>
    </PageLayout>
  );
}

export default Home;
