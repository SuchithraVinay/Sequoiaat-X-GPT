import React from "react";
import { Row, Col, Button, Input, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AskQuestion() {
  const responsiveCol = { xxl: 6, xl: 6, lg: 24, md: 24, sm: 24, xs: 24 };
  const responsiveColMid = { xxl: 12, xl: 12, lg: 24, md: 24, sm: 24, xs: 24 };
  const responsiveColTextArea = {
    xxl: 24,
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  };
  const responsiveColInput = {
    xxl: 18,
    xl: 18,
    lg: 18,
    md: 18,
    sm: 18,
    xs: 18,
  };
  const responsiveColButton = {
    xxl: 6,
    xl: 6,
    lg: 6,
    md: 6,
    sm: 6,
    xs: 6,
  };

  const gutter = { xs: 8, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 };
  return (
    <div>
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
                placeholder="Have a question?"
                style={{ height: "42px" }}
                suffix={
                  <QuestionCircleOutlined
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                }
              />
            </Col>
            <Col {...responsiveColButton}>
              <Button className="btn-submit">Submit</Button>
            </Col>
          </Row>
          <Row justify="start" gutter={gutter}>
            <Col {...responsiveColTextArea}>
              <TextArea
                placeholder="Your answer will be displayed here"
                autoSize={{ minRows: 10, maxRows: 10 }}
              />
            </Col>
          </Row>
        </Col>
        <Col {...responsiveCol}></Col>
      </Row>
      <Row className="center">
        <Col span={24}>
          <Button className="btn">Ask Another Question</Button>
        </Col>
      </Row>
    </div>
  );
}

export default AskQuestion;
