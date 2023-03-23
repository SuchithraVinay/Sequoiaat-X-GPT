import React, { useState } from "react";
import { Typography, Form, Input, Button, message } from "antd";
import "../App.css";
import logo from "../Assets/x-gpt-logo.PNG";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function Login() 
{
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("");
	const [loginResponse, setLoginResponse] = useState({});
	const [loginAPILoading, setLoginAPILoading] = useState(false);

	const onFinish = (loginData) => 
	{
		login(loginData);
	};
	
	const onFinishFailed = (errorInfo) => 
	{
		console.log('Failed:', errorInfo);
	};

	const login = async (loginData) =>
	{
		setLoginAPILoading(true);
		var apiURL = window.appConfig.SERVER_URL;
		const formData = new FormData();
		formData.append("user_name", loginData.user_name);
		formData.append("password", loginData.password);

		var res = await axios.post(apiURL +`user_login`, formData, {"Content-Type": "application/json",});
		var loginResponse = res.data;
		setLoginResponse(loginResponse);
		setLoginAPILoading(false);
		if(loginResponse)
		{
			if(loginResponse.status == "Success")
			{
				setErrorMsg("");
				navigate('/DocumentUpload');
			} else
			{
				setErrorMsg(loginResponse.message);
			}
		} else
		{
			setErrorMsg("Something went wrong, Please try again!");
		}
	}

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
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}>
						<Form.Item style={{ marginBottom: "-5px" }}>
							<span>
								<p className="form-title">Welcome back</p>
								<p className="form-subtitle">
									Welcome back! Please enter your details.
								</p>
							</span>
							{
								errorMsg != ""
									?
										<p style={{ color: "red" }}>{errorMsg}</p>
									:
										null
							}
						</Form.Item>
						<Form.Item
							name="user_name"
							label=
							{
								<span>
									<b>Username</b>
								</span>
							}
							rules=
							{[
								{ required: true, message: "Please input your username!" },
							]}>
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
							]}>
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
								disabled={loginAPILoading}>
								{loginAPILoading ? "LOGGING IN" : "LOGIN"}
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
