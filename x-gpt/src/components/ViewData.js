import React from "react";
import { Row, Col, Button, Table } from "antd";
import AskQuestion from './AskQuestion'

function ViewData() 
{
	const localStorageData = JSON.parse(localStorage.getItem("tableData"));

	const tableData = localStorageData.output_data.data_list;
	const columns = localStorageData.output_data.columns.map((data) => 
	{
		return {
			title: data,
			dataIndex: data,
			key: data,
			width: 100,
		}
	});
  
	return (
		<div>
			<Row className="center">
			<Col span={24}>
				<p className="title">Data Insights from your Excel file</p>
			</Col>
			<Col span={24}>
				<p className="subtitle">
				Congratulations, your Excel file has been successfully uploaded!
				Below is a table view of your data, showing a<br></br>
				breakdown of its contents. Press Next to ask your questions.
				</p>
			</Col>
			<Col style={{ padding: "60px" }}>
				<Table
					dataSource={tableData}
					columns={columns}
					scroll={{ x: 1500, y: 200 }}
					size="middle"
				/>
			</Col>
			{/* <Col span={24} style={{ marginTop: '-32px' }}>
				<Button className="btn" onClick={navigateAskQuestion}>
				Next
				</Button>
			</Col> */}
			</Row>
			<AskQuestion />
		</div>
	);
}

export default ViewData;
