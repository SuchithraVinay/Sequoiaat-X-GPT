import React from "react";
import { Row, Col, Upload, Form, Button } from "antd";
import "../App.css";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function DocumentUpload() {
  const navigate = useNavigate();

  const navigateViewData = () => {
    navigate("/ViewData");
  };

  const responsiveCol = { xxl: 6, xl: 6, lg: 24, md: 24, sm: 24, xs: 24 };
  const responsiveColMid = { xxl: 12, xl: 12, lg: 24, md: 24, sm: 24, xs: 24 };
  const responsiveColElement = {
    xxl: 24,
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  };

  const gutter = { xs: 8, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 };

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
                multiple
                accept=".xls, .csv, .pdf"
                name="files"
              >
                <p style={{ fontSize: 'xx-large'}}>
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
              onClick={navigateViewData}
            >
              File Upload
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
