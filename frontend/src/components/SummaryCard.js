import React, { useEffect, useState } from "react";
import { getCards } from "../redux/card/cardActions";
import { useDispatch, useSelector } from "react-redux";
import CardDoc from "./CardDoc";
import DatePicker from "react-date-picker";
import GraphCard from "./GraphCard";
import Select from "react-select";

function SummaryCard() {
  const [showGraph, setShowGraph] = useState(true);

  // begining of Month
  var beginingDate = new Date(Date.now());
  beginingDate.setDate(-30);

  //from date
  const [fromDate, setFromDate] = useState(beginingDate);
  const fromDt = fromDate.getDate();
  const fromMonth = fromDate.getMonth() + 1;
  const fromYear = fromDate.getFullYear();
  const fromDateSt = `${fromYear}-${fromMonth}-${fromDt}`;

  //to next date
  const [toDate, setToDate] = useState(new Date(Date.now()));
  var toNextDate = new Date(toDate);
  toNextDate.setDate(toNextDate.getDate() + 1);
  const toDt = toNextDate.getDate();
  const toMonth = toNextDate.getMonth() + 1;
  const toYear = toNextDate.getFullYear();
  const toDateSt = `${toYear}-${toMonth}-${toDt}`;

  const [filterObject, setFilterObject] = useState({
    entryDate: "",
    pS: "",
    line: "",
    processNo: "",
    item: "",
    abnormality: "",
    cardType: "",
    status: "",
  });

  const dispatch = useDispatch();

  let queryStr = "";
  for (let key in filterObject) {
    let value = filterObject[key];

    if (value != "") {
      if (queryStr == "") {
        queryStr = `${key}=${value}`;
      } else {
        queryStr = `${queryStr}&${key}=${value}`;
      }
    }
  }

  useEffect(() => {
    dispatch(getCards(fromDateSt, toDateSt, queryStr));
  }, [fromDate, toDate, filterObject]);

  const cards = useSelector((state) => state.cards);
  const cardList = cards.loading
    ? []
    : cards.cards.success
    ? cards.cards.cards
    : [];

  const list = cardList.map((item) => {
    // return null
    return (
      <CardDoc
        key={item._id}
        item={item}
        fromDateSt={fromDateSt}
        toDateSt={toDateSt}
      />
    );
  });

  var total = 0;
  var complete = 0;
  var inprogress = 0;
  var pending = 0;
  if (cardList.length > 0) {
    total = cardList.length;
    cardList.forEach((item) => {
      if (item.status === "complete") {
        complete += 1;
      }
      if (item.status === "pending") {
        pending += 1;
      }
      if (item.status === "inprogress") {
        inprogress += 1;
      }
    });
  }

  const labels = ["Total", "Complete", "Pending", "Inprogress"];
  const data = [total, complete, pending, inprogress];

  const filterHandler = (e) => {
    setFilterObject((filterObject) => {
      filterObject[e.target.name] = e.target.value;
      return {
        ...filterObject,
      };
    });
  };

  const deptOptions = [
    { value: "S", label: "Production." },
    { value: "P", label: "Maintenance" },
  ];

  const deptHandler = (e) => {
    setFilterObject((filterObject) => {
      filterObject["pS"] = e.value;
      return {
        ...filterObject,
      };
    });
  };

  const cardTypeOptions = [
    { value: "red", label: "RED" },
    { value: "white", label: "WHITE" },
  ];

  const cardTypeHandler = (e) => {
    setFilterObject((filterObject) => {
      filterObject["cardType"] = e.value;
      return {
        ...filterObject,
      };
    });
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "complete", label: "Complete" },
  ];

  const statusHandler = (e) => {
    setFilterObject((filterObject) => {
      filterObject["status"] = e.value;
      return {
        ...filterObject,
      };
    });
  };

  const entryDateHandler = (date) => {
    setFilterObject((filterObject) => {
      filterObject["entryDate"] = date;
      return {
        ...filterObject,
      };
    });
  };

  const targetHandler = (date) => {
    setFilterObject((filterObject) => {
      filterObject["target"] = date;
      return {
        ...filterObject,
      };
    });
  };
  const clearFilterHandler = () => {
    setFilterObject({
      entryDate: "",
      pS: "",
      line: "",
      processNo: "",
      item: "",
      abnormality: "",
      cardType: "",
      status: "",
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center bg-info ">
        <h3 className="mx-3  text-center ">Summary of Cards </h3>
        {showGraph ? (
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowGraph(false)}
          >
            Hide Graph
          </button>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowGraph(true)}
          >
            Show Graph
          </button>
        )}
        <div className="ms-auto me-3">
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
      </div>

      <div className="d-flex justify-content-between ">
        {showGraph ? <GraphCard labels={labels} data={data} /> : null}
        <button
          className="btn btn-primary d-block mx-5 d-inline-block "
          style={{
            height: "40px",
            marginBottom: "16px",
            marginTop: "auto",
            marginLeft: "auto",
            marginRight: "16px",
          }}
          onClick={clearFilterHandler}
        >
          {" "}
          Clear Filters
        </button>
      </div>
      <div className="overflow-auto " style={{ height: "65vh", width: "97vw" }}>
        <table className="m-3  table table-bordered table-sm table-hover text-dark">
          {/* <table className="m-5 border border-black-50 text-light"> */}
          <thead>
            <tr>
              <th>Entry_Date</th>
              <th>Dept.</th>
              <th>Line</th>
              <th>OP</th>
              <th>Item</th>
              <th>Abnormality</th>
              <th>Card Type</th>
              <th>Status</th>
              <th style={{minWidth:"100px"}}>Image</th>
              <th style={{minWidth:"100px"}}>Delete</th>
              <th style={{minWidth:"100px"}}>Update</th>
              <th></th>
            </tr>
            <tr>
              <td>
                {/* <DatePicker
                  value={filterObject.entryDate}
                  onChange={entryDateHandler}
                  clearIcon={null}
                  // className="px-3"
                /> */}
              </td>

              <td>
                <Select
                  className="d-inline"
                  options={deptOptions}
                  // defaultValue={{ value: "", label: "" }}
                  menuPlacement="bottom"
                  onChange={deptHandler}
                />
              </td>

              <td>
                <input
                  type="text"
                  name="line"
                  onChange={filterHandler}
                  value={filterObject["line"]}
                  className="w-100"
                />
              </td>

              <td>
                <input
                  type="text"
                  name="processNo"
                  onChange={filterHandler}
                  value={filterObject["processNo"]}
                  className="w-100"
                />
              </td>

              <td>
                <input
                  type="text"
                  name="item"
                  onChange={filterHandler}
                  value={filterObject["item"]}
                  className="w-100"
                />
              </td>

              <td>
                <input
                  type="text"
                  name="abnormality"
                  onChange={filterHandler}
                  value={filterObject["abnormality"]}
                  className="w-100"
                />
              </td>

              <td>
                <Select
                  className="d-inline"
                  options={cardTypeOptions}
                  // defaultValue={{ value: "red", label: "Red" }}
                  menuPlacement="bottom"
                  onChange={cardTypeHandler}
                />
              </td>

              <td>
                <Select
                  className="d-inline"
                  options={options}
                  // defaultValue={{ value: "pending", label: "Pending" }}
                  menuPlacement="bottom"
                  onChange={statusHandler}
                />
              </td>

              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </div>
  );
}

export default SummaryCard;
