import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import TrendGraph from "./TrendGraph";
import DatePicker from "react-date-picker";
import "./trend.css";

function TrendGraphModal({ showModal, setShowModal, id }) {
  const handleClose = () => {
    // setIsOpen(false)
    setShowModal(false);
  };

  let info = {};

  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [searchParams] = useSearchParams();
  for (const e of searchParams.entries()) {
    let [f, v] = e;
    info[f] = v;
  }

  // const { line, processNo } = info;

  // const users = useSelector((state) => state.users);

  // begining of Month
  var beginingDate = new Date(Date.now());
  beginingDate.setDate(-30);

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

  // const user = users.loading
  //   ? null
  //   : users.users.success
  //   ? users.users.user._id
  //   : null;

  var dataList = [];
  var labelsList = [];

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/find/${id}/fromDate/${fromDateSt}/toDate/${toDateSt}`
      )
      .then((result) => {
        result.data.dailyStatus.forEach((item) => {
          labelsList.push(item.entryFor);
          // if (parseFloat(item.value) === NaN) {
          //   dataList.push(0);
          // } else {
          dataList.push(parseFloat(item.value));
          // }
        });
        setData(dataList);
        setLabels(labelsList);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, [fromDate, toDate]);

  // const formHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/create`,
  //       {
  //         checkItem: itemId,
  //         abnormality,
  //         countermeasure,
  //         targetDate: target,
  //         pic,
  //         user,
  //         line,
  //         processNo,
  //         spare,
  //         status,
  //       }
  //       // , { withCredentials: true }
  //     )
  //     .then((result) => {
  //       toast.success("Saved Successfully");
  //       setShowModal(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Please fill Abnormility Details");
  //     });
  // };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="my-modal"
      contentClassName="modal-height"
     
    >
      <Modal.Header closeButton>
        <Modal.Title>Trend Graphs</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <TrendGraph data={data} labels={labels} />
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

export default TrendGraphModal;
