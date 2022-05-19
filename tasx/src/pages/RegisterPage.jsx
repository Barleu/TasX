import React from "react";
import { Form, Input, Button } from "antd";
import { auth, firestore } from "../firebase/config";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await auth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );

    const userId = res.user.uid;
    const newUserRef = firestore.collection("users").doc(userId);
    newUserRef.set({
      name: values.name,
      isAdmin: false,
    });
  };

  return (
    <div className="auth-background">
      <div className="div-login">
        <div className="card-lung">Join the team!</div>
        <div>
          <Form name="basic" onFinish={onFinish} alignItems="center">
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            Click here to
            <Link to="/login">Login</Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
