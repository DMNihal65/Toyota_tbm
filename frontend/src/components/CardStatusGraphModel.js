import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import TrendGraph from "./TrendGraph";
import DatePicker from "react-date-picker";
import "./trend.css";
import CardStatusGraph from "./CardStatusBar";

function CardStatusGraphModel({ showModal, setShowModal, line }) {
  const handleClose = () => {
    setShowModal(false);
  };

  const filters = useSelector((state) => state.filters);

  let info = {};

  const [data, setData] = useState({});
  const [searchParams] = useSearchParams();
  for (const e of searchParams.entries()) {
    let [f, v] = e;
    info[f] = v;
  }

  // begining of Month
  var beginingDate = new Date(Date.now());
  beginingDate.setDate(-1);

  //from date
  const [fromDate, setFromDate] = useState(beginingDate);
  const fromDt = fromDate.getDate();
  const fromMonth = fromDate.getMonth() + 1;
  const fromYear = fromDate.getFullYear();
  const fromDateSt = `${fromYear}-${fromMonth}-${fromDt}`;

  const [toDate, setToDate] = useState(new Date(Date.now()));
  var toNextDate = new Date(toDate);
  toNextDate.setDate(toNextDate.getDate() + 1);
  const toDt = toNextDate.getDate();
  const toMonth = toNextDate.getMonth() + 1;
  const toYear = toNextDate.getFullYear();
  const toDateSt = `${toYear}-${toMonth}-${toDt}`;

  useEffect(() => {
    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/getGraphData`, {
        "line": line,
        "startDate": fromDate.toLocaleDateString(),
        "endDate": toDate.toLocaleDateString(),
        "pS": filters.pS
      }
      )
      .then((result) => {
        setData(result.data.totalData)
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, [fromDate, toDate]);

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="my-modal"
      contentClassName="modal-height"
    >
      <Modal.Header closeButton>
        <Modal.Title>Line Status Graphs</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <CardStatusGraph unFilteredData={data} />
      </Modal.Body>
      <Modal.Footer>
        <div className="ms-4 my-2 ">
          <span>From</span>
          <DatePicker
          format="dd/MM/yyyy"
            value={fromDate}
            onChange={setFromDate}
            clearIcon={null}
          />
          <span className="ms-3">To</span>
          <DatePicker format="dd/MM/yyyy" value={toDate} onChange={setToDate} clearIcon={null} />
        </div>

        {/* <Button variant="primary" type="submit" onClick={formHandler}>
          Submit
  </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default CardStatusGraphModel