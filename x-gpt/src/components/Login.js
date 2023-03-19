import React from "react";
import { Typography, Form, Input, Button } from "antd";
import "../App.css";
import logo from "../Assets/x-gpt-logo.PNG";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  const navigateDocumentUpload = () => {
    navigate('/DocumentUpload');
  };

  return (
    <>
      <div className="App-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="login-page">
        <div className="login-box">
          <Form
            layout="vertical"
            name="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item style={{ marginBottom: "-5px" }}>
              <span>
                <p className="form-title">Welcome back</p>
                <p className="form-subtitle">
                  Welcome back! Please enter your details.
                </p>
              </span>
            </Form.Item>

            <Form.Item
              name="username"
              label={
                <span>
                  <b>Username</b>
                </span>
              }
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span>
                  <b>Password</b>
                </span>
              }
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <span>
                <Input.Password placeholder="Password" />
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form-button"
                onClick={navigateDocumentUpload}
              >
                LOGIN
              </Button>
            </Form.Item>
            <p>
              Don't have an account? <a>Sign up</a>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
