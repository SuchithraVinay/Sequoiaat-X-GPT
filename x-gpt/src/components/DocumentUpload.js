import React, { useState } from "react";
import { Row, Col, Upload, Form, Button, message } from "antd";
import "../App.css";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function DocumentUpload() 
{
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("");
	const [fileUploading, setFileUploading] = new useState(false);
	const [selectedFile, setSelectedFile] = new useState([]);

	const responsiveCol = { xxl: 6, xl: 6, lg: 24, md: 24, sm: 24, xs: 24 };
	const responsiveColMid = { xxl: 12, xl: 12, lg: 24, md: 24, sm: 24, xs: 24 };
	const responsiveColElement = 
	{
		xxl: 24,
		xl: 24,
		lg: 24,
		md: 24,
		sm: 24,
		xs: 24,
	};

	const gutter = { xs: 8, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 };

	const props = 
	{
		multiple: false,
		accept:".xlsx, .xls, .csv, .pdf",
		onRemove: (file) => 
		{
			var index = selectedFile.indexOf(file);
			var newFileList = selectedFile.slice();
			newFileList.splice(index, 1);
			setSelectedFile(newFileList);
		},
		beforeUpload: (file) => 
		{
			var selectedFile = [];
			selectedFile.push(file);
			setSelectedFile(selectedFile);
		},
		fileList: selectedFile,
	};

	const fileUpload = async () =>
	{
		try
		{
			if(selectedFile && selectedFile.length > 0)
			{
				setFileUploading(true);
				var apiURL = window.appConfig.SERVER_URL;
				const formData = new FormData();
				formData.append("filename", selectedFile[0]);
		
				var res = await axios.post(apiURL +`file_upload`, 
					formData, {"Content-Type": "application/json",});
				var fileUploadRes = res.data;
				setFileUploading(false);
				if(fileUploadRes)
				{
					setErrorMsg("");
					message.success("file uploaded successfully.");
					localStorage.setItem("tableData", JSON.stringify(fileUploadRes))
					navigate('/ViewData', { state: fileUploadRes })
				} else
				{
					setErrorMsg("File upload failed");
				}
			}
		} catch(exception)
		{
			setErrorMsg("File upload failed");
		}
	}

	return (
		<div>
			<Row className="center">
				<Col span={24}>
					<p className="title">Upload Excel File</p>
				</Col>
				<Col span={24}>
					<p className="subtitle">
						If you are ready to upload your document, simply select the file you
						would like to upload and press the file upload<br></br> button
						below. You can also upload the files in various formats, including
						.xls and .cvs
					</p>
					{
						errorMsg != ""
							?
								<p>{errorMsg}</p>
							:
								null
					}
				</Col>
			</Row>
			<Row justify="start" style={{ padding: "30px" }}>
				<Col {...responsiveCol}></Col>
				<Col {...responsiveColMid}>
					<Row justify="start" gutter={gutter} style={{ marginBottom: "16px" }}>
						<Col {...responsiveColElement}>
							<Upload.Dragger
								//   customRequest={handleCustomRequest}
								//   onRemove={fileRemove}
								// multiple
								// accept=".xlsx, .xls, .csv, .pdf"
								// name="files"
								{...props}
							>
								<p style={{ fontSize: 'xx-large' }}>
									<UploadOutlined />
								</p>
								<p className="title" style={{ color: "#898686" }}>
									Drag and Drop or
								</p>
								<p className="title" style={{ color: "#69b1ff" }}>
									Browse
								</p>
								<p className="subtitle">Max File size: 500MB</p>
							</Upload.Dragger>
						</Col>
					</Row>
					<Row justify="start" gutter={gutter}>
						<Col {...responsiveColElement}>
							<Button
								htmlType="submit"
								className="file-upload-form-button"
								disabled={fileUploading || !selectedFile || selectedFile.length == 0}
								onClick={fileUpload}>
								{fileUploading ? "Uploading" :  "Upload"}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col {...responsiveCol}></Col>
			</Row>
		</div>
	);
}

export default DocumentUpload;
