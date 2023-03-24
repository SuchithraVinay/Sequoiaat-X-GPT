import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Button, Input, Table, Spin, Tooltip } from "antd";
import { QuestionCircleOutlined, BackwardOutlined, ArrowDownOutlined, ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

function AskQuestion() 
{
	const navigate = useNavigate();
	const askQuestionRef = useRef();
	const responsiveCol = { xxl: 6, xl: 6, lg: 24, md: 24, sm: 24, xs: 24 };
	const responsiveColMid = { xxl: 12, xl: 12, lg: 24, md: 24, sm: 24, xs: 24 };
	const responsiveColTextArea = 
	{
		xxl: 24,
		xl: 24,
		lg: 24,
		md: 24,
		sm: 24,
		xs: 24,
	};
	const responsiveColInput = 
	{
		xxl: 16, //18,
		xl: 16, //18,
		lg: 16, //18,
		md: 16, //18,
		sm: 16, //18,
		xs: 16, //18,
	};
	const responsiveColButton = 
	{
		xxl: 4,
		xl: 4,
		lg: 4,
		md: 4,
		sm: 4,
		xs: 4,
		// xxl: 6,
		// xl: 6,
		// lg: 6,
		// md: 6,
		// sm: 6,
		// xs: 6,
	};
	const responsiveColBackButton = 
	{
		xxl: 4,
		xl: 4,
		lg: 4,
		md: 4,
		sm: 4,
		xs: 4,
	};

	const gutter = { xs: 8, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 };

	const [askQuestionInputFocused, setAskQuestionInputFocused] = new useState(false);
	const [userQuestion, setUserQuestion] = new useState("");
	const [tableData, setTableData] = new useState([]);
	const [columns, setColumns] = new useState([]);
	const [filterTableDataAPILoading, setFilterTableDataAPILoading] = new useState(false);
	const [filteredData, setFilteredData] = new useState({});
	const localStoragetableData = JSON.parse(localStorage.getItem("tableData"));

	const getFilteredData = async () =>
	{
		setFilterTableDataAPILoading(true);
		setFilteredData(filteredData);
		setTableData([]);
		setColumns([]);
		scrollIntoViewById("filter-data-spinner");

		try
		{
			var apiURL = window.appConfig.SERVER_URL;
			const formData = new FormData();
			formData.append("table_name", localStoragetableData.table_name);
			formData.append("user_question", userQuestion);

			var res = await axios.post(apiURL +`get_query_data`, 
				formData, {"Content-Type": "application/json",});
			setFilterTableDataAPILoading(false);
			var filteredData = res.data;
			setFilteredData(filteredData);
			if(filteredData.status == "Success")
			{
				localStorage.setItem("filteredData", JSON.stringify(filteredData));
				var tableData = (filteredData && filteredData.output_data != null) ? filteredData.output_data.data_list : [];
				var columns = (filteredData && filteredData.output_data != null) ? filteredData.output_data.columns.map((data) => 
				{
					return {
						title: data,
						dataIndex: data,
						key: data,
						width: 100,
					}
				}) : null;
				setTableData(tableData);
				setColumns(columns);

				setTimeout(() => {
					scrollIntoViewById("table");
				}, 1000);
			} else
			{

			}
		} catch(exception)
		{
			setFilterTableDataAPILoading(false);
			setFilteredData({status: "Failed"});
		}
	}

	const scrollIntoViewById = (elementId) =>
	{
		var element = document.getElementById(elementId);
		if(element)
		{
			element.scrollIntoView();
		}
	}

	const askAnotherQuestion = () =>
	{
		setAskQuestionInputFocused(true);
		scrollIntoViewById('ask-question');
		askQuestionRef.current.focus();
	}

	const goBack = () =>
	{
		localStorage.removeItem("tableData");
		localStorage.removeItem("filteredData");
		navigate('/DocumentUpload');
	}

	const closeTable = () =>
	{		
		setFilteredData(filteredData);
		setTableData([]);
		setColumns([]);
	}

	return (
		<div style={{ marginTop: '-98px' }}>
			<Row className="center">
				<Col>
					<Row justify="start">
						<Col span={24}>
							<p className="title">Ask Your Questions</p>
						</Col>
					</Row>
					<Row justify="start">
						<Col span={24}>
							<p className="subtitle">
							Need an answer? Look no further! Our AI-powered question and
							answer platform is ready to help. Simply type your<br></br>
							question and I'll try my best to provide you with a helpful
							response.
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<div style={{color: "red", marginBottom: "2px"}}>
				{
					filteredData && filteredData.status == "Failed"
						?
							"Please try some other question"
						:
							null
				}
			</div>
			<Row justify="start" style={{ padding: "30px" }}>
				<Col {...responsiveCol}></Col>
				<Col {...responsiveColMid}>
					<Row justify="start" gutter={gutter} style={{ marginBottom: "16px" }}>
						<Col {...responsiveColInput} id="ask-question">
							<Input
								focus={{preventScroll: askQuestionInputFocused, cursor: "start"}}
								placeholder="Have a question?"
								ref={askQuestionRef}
								style={{ height: "42px" }}
								suffix={
									<QuestionCircleOutlined
										style={{ color: "rgba(0,0,0,.45)" }}
									/>
								}
								value={userQuestion}
								onChange={(e) => setUserQuestion(e.target.value)}
							/>
						</Col>
						<Col {...responsiveColButton}>
							<Button 
								className="btn-submit"
								onClick={getFilteredData}>
								Submit
							</Button>
						</Col>
						<Col {...responsiveColBackButton}>
							{/* <ArrowLeftOutlined></ArrowLeftOutlined> */}
							<Button 
								className="btn-submit"
								onClick={goBack}>Go Back
							</Button>
						</Col>
					</Row>
       			</Col>
        		<Col {...responsiveCol}></Col>
     		</Row>
			 <div id="filter-data-spinner">
			{
				filterTableDataAPILoading
					?
						<Spin/>
					:
						tableData && tableData.length > 0
							?
								<>
									<Tooltip title="Close the table">
										<Button style={{ marginRight: "55px", float: "right"}} onClick={closeTable}>
											<CloseOutlined></CloseOutlined>
										</Button>
									</Tooltip>
									<div style={{ padding: "60px" }} id="table">
										<Table
											dataSource={tableData}
											columns={columns}
											scroll={{ x: 1500, y: 200 }}
											size="middle"
										/>
									</div>
									<Row className="center">
										<Col span={12}>
											<Button className="btn" size="large" 
												onClick={askAnotherQuestion}>
												Ask Another Question
											</Button>
										</Col>
									</Row>
								</>
							:
								null
			}
			</div>
		</div>
  	);
}
export default AskQuestion;
