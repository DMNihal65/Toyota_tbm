import React, { Fragment, useState, useEffect, useRef } from "react";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDate,
  filterDept,
  filterLine,
  filterCheck,
  filterGroup
} from "../redux/filter/filterActions";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const todayDate = new Date(Date.now());

//getting week no
// Date.prototype.getWeek = function() {
//   var dt = new Date(this.getFullYear(), 0, 1);
//   return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7);
// };

// end week no

function Filters() {
  const selectLineRef = useRef(null);

  const [date, setDate] = useState(todayDate);

  // generate options for selecting line
  var lineOptions = [{ value: null, label: "All Lines" }];
  var lineOptions2 = [];
  const { machineData } = useSelector((state) => state.machines);
  if (machineData.machineData != undefined) {
    lineOptions2 = machineData.machineData.map((element) => {
      return { value: element.line, label: element.line };
    });
    lineOptions = [...lineOptions, ...lineOptions2];
  }

  // const totalCount = machines.loading
  //   ? { totalCountBlock: 0, totalCountCrank: 0, totalCountHead: 0 }
  //   : machines.machineData.success
  //   ? machines.machineData.totalCount
  //   : { totalCountBlock: 0, totalCountCrank: 0, totalCountHead: 0 };

  // const { totalCountBlock, totalCountCrank, totalCountHead } = totalCount;

  const dispatch = useDispatch();
  // const filters = useSelector((state) => state.filters);
  // let queryStr = `d=${filters.d}&m=${filters.m}&y=${filters.y}&pS=${filters.pS}`;
  const deptOptions = [
    { value: "S", label: "Production Dept" },
    { value: "P", label: "Maint Dept" },
  ];

  const checkOptions = [
    { value: null, label: "All Check" },
    { value: "S", label: "Stop Check" },
    { value: "R", label: "Run Check" },
  ];
  const groupOptions = [
    { value: null, label: "All Group" },
    { value: "white", label: "White Group" },
    { value: "yellow", label: "Yellow Group" },
  ];

  // const lineOptions = [
  //   { value: null, label: "All Lines" },
  //   { value: "Head", label: "Head" },
  //   { value: "Block", label: "Block" },
  //   { value: "Crank", label: "Crank" },
  //   {
  //     value: "Assembly (Head Sub-assembly)",
  //     label: "Assembly (Head Sub-assembly)",
  //   },
  //   {
  //     value: "Assembly (Block Sub-assembly)",
  //     label: "Assembly (Block Sub-assembly)",
  //   },
  //   { value: "Assembly (MK-1)", label: "Assembly (MK-1)" },
  // ];

  useEffect(() => {
    console.log(date);
    dispatch(
      filterDate(
        date.getDay(),
        Math.floor(date.getDate() / 7.1) + 1,
        date.getMonth() + 1,
        date.getFullYear(),
        date.getDate()
      )
    );
  }, [dispatch, date]);

  const selectDeptHandler = (e) => {
    dispatch(filterDept(e.value));
  };

  const selectLineHandler = (e) => {
    dispatch(filterLine(e.value));
  };

  const selectCheckHandler = (e) => {
    dispatch(filterCheck(e.value));
  };

  const selectGroupHandler = (e) => {
    dispatch(filterGroup(e.value));
  };

  return (
    <Fragment>
      <hr className="my-2"></hr>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <DatePicker
            value={date}
            format="dd/MM/yyyy"
            onChange={setDate}
            clearIcon={null}
            className="px-3"
          />
        </div>

        <Link to="/">
          <Button className="mx-1 bg-blue px-3">
            <i className="bi bi-house"></i> Home
          </Button>
        </Link>

        {/* <Link to="/teamleader">
          <Button variant="secondary" className="mx-3 bg-green px-3">
            Team Leader
          </Button>
        </Link> */}

        {/* 
        <Container className="mx-3 px-3" style={{ maxWidth: "30vw" }}>
          <Row className="bg-info text-light border rounded-2 d-flex align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center">
              <h6 className="my-2">Total Check</h6>
            </Col>
            <Col xs={12} md={6} className="text-center">
              <h6 className="my-2">
                Block: {totalCountBlock} | Crank: {totalCountCrank} | Head:{" "}
                {totalCountHead}
              </h6>
            </Col>
          </Row>
        </Container> */}

        <Select
          options={deptOptions}
          onChange={selectDeptHandler}
          className="mx-1 secondary"
          defaultValue={{ value: "S", label: "Production Dept" }}
          isSearchable={false}
        />

        <Select
          ref={selectLineRef}
          options={lineOptions}
          onChange={selectLineHandler}
          className="mx-1 secondary"
          defaultValue={lineOptions[0]}
          isSearchable={false}
        />

        <Select
          options={checkOptions}
          onChange={selectCheckHandler}
          className="mx-1 secondary"
          defaultValue={checkOptions[0]}
          isSearchable={false}
        />
        <Select
          options={groupOptions}
          onChange={selectGroupHandler}
          className="mx-1 secondary"
          defaultValue={groupOptions[0]}
          isSearchable={false}
        />

        <Link to="/pendingTasks">
          <Button color="blue" className="mx-1">
            <i className="bi bi-card-list px-1"></i>
            Pending Tasks
          </Button>
        </Link>

        {/* <Link to="/judgementHistory">
          <Button color="blue" className="mx-1">
            <i className="bi bi-card-list px-1"></i>
            Judgement History
          </Button>
        </Link> */}
      </div>
      <hr className="my-2"></hr>
    </Fragment>
  );
}

export default Filters;
