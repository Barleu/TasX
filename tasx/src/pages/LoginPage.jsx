import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="auth-background">
      <div className="div-login">
        <div className="card-lung">Login to see your progress</div>
        <div>
          <Form name="basic" onFinish={() => null} alignItems="center">
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            Click here to <Link to={`/register/`}>Register</Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
