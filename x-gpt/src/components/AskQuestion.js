import React, { useState } from "react";
import { Row, Col, Button, Input, Table, Spin } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

function AskQuestion() 
{
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
		xxl: 18,
		xl: 18,
		lg: 18,
		md: 18,
		sm: 18,
		xs: 18,
	};
	const responsiveColButton = 
	{
		xxl: 6,
		xl: 6,
		lg: 6,
		md: 6,
		sm: 6,
		xs: 6,
	};

	const gutter = { xs: 8, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 };

	const [askQuestionInputFocused, setAskQuestionInputFocused] = new useState(false);
	const [userQuestion, setUserQuestion] = new useState("");
	const [tableData, setTableData] = new useState([]);
	const [columns, setColumns] = new useState([]);
	const [filterTableDataAPILoading, setFilterTableDataAPILoading] = new useState(false);
	const localStoragetableData = JSON.parse(localStorage.getItem("tableData"));

	const getFilteredData = async () =>
	{
		setFilterTableDataAPILoading(true);
		scrollIntoViewById("filter-data-spinner");
		var apiURL = window.appConfig.SERVER_URL;
		const formData = new FormData();
		formData.append("table_name", localStoragetableData.table_name);
		formData.append("user_question", userQuestion);

		var res = await axios.post(apiURL +`get_query_data`, 
			formData, {"Content-Type": "application/json",});
		setFilterTableDataAPILoading(false);
		var filteredData = res.data;
		if(filteredData)
		{					
			localStorage.setItem("filteredData", JSON.stringify(filteredData));
			var tableData = filteredData.output_data.data_list;
			var columns = filteredData.output_data.columns.map((data) => 
			{
				return {
					title: data,
					dataIndex: data,
					key: data,
					width: 100,
				}
			});
			setTableData(tableData);
			setColumns(columns);

			setTimeout(() => {
				scrollIntoViewById("table");
			}, 1000);
		} else
		{

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
			<Row justify="start" style={{ padding: "30px" }}>
				<Col {...responsiveCol}></Col>
				<Col {...responsiveColMid}>
				<Row justify="start" gutter={gutter} style={{ marginBottom: "16px" }}>
					<Col {...responsiveColInput}>
						<Input
							autoFocus={askQuestionInputFocused}
							placeholder="Have a question?"
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
									<div style={{ padding: "60px" }} id="table">
										<Table
											dataSource={tableData}
											columns={columns}
											scroll={{ x: 1500, y: 200 }}
											size="middle"
										/>
									</div>
									<Row className="center">
										<Col span={24}>
											<Button className="btn" onClick={askAnotherQuestion}>
												Ask Another Question
											</Button>
										</Col>
									</Row>
								</>
							:
								userQuestion != ""
									?
										<div>No data found</div>
									:
										null
			}
			</div>
		</div>
  	);
}
export default AskQuestion;
