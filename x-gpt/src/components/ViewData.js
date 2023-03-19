import React from "react";
import { Row, Col, Button, Table } from "antd";
import { stockData } from "../Data";
import { useNavigate } from "react-router-dom";

function ViewData() {
  const navigate = useNavigate();

  const navigateAskQuestion = () => {
    navigate("/AskQuestion");
  };

  const tableData = stockData.map((data) => {
    return {
      key: data.id,
      id: data.id,
      company: data.company,
      ticker: data.ticker,
      stockPrice: data.stockPrice,
      timeElapsed: data.timeElapsed,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 100,
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      width: 100,
    },
    {
      title: "StockPrice",
      dataIndex: "stockPrice",
      key: "stockPrice",
      width: 100,
    },
    {
      title: "TimeElapsed",
      dataIndex: "timeElapsed",
      key: "timeElapsed",
      width: 100,
    },
  ];
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
        <Col span={24} style={{ marginTop: '-32px' }}>
          <Button className="btn" onClick={navigateAskQuestion}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ViewData;
