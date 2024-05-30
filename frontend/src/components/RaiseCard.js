import React, { useState } from "react";
import "./raiseCard.css";
import Select from "react-select";
// import { Button } from "react-bootstrap";

const options = [
  { value: "white", label: "White Card" },
  { value: "red", label: "Red Card" },
];
const optionsStatus = [
  { label: "Pending", value: "pending" },
  { label: "Inprogress", value: "inprogress" },
  { label: "Complete", value: "complete" },
];
const RaiseCard = () => {
  const [color, setColor] = useState("white");
  const [logo, setLogo] = useState("pending");

  const cardTypeHandler = (e) => {
    setColor(e.value);
  };

  const statusHandler = (e) => {
    setLogo(e.value);
  };
  return (
    <div className=" d-flex flex-column  align-items-center raiseCard mt-5 mx-auto">
      <div className={`firstDiv ${color} `}>
        <h1>CARD</h1>
      </div>
      <div className="secondDiv d-flex">
        <div className=" p-4">
          <h6>Type</h6>
          <div className="h5 ">
            <Select
              options={options}
              defaultValue={{ label: "White Card", value: "white" }}
              onChange={cardTypeHandler}
            />
          </div>
        </div>
        <div className="p-4">
          <h6> Description</h6>
          <textarea rows="5" />
        </div>
        <div className="p-4">
          <h6> Status</h6>
          <div className="h5 ">
            <Select
              options={optionsStatus}
              defaultValue={{ label: "Pending", value: "pending" }}
              // menuPlacement="top"
              onChange={statusHandler}
            />
          </div>
          <div className="statusImg">
            <img src={`/${logo}.png`} alt="status" />
          </div>
        </div>
      </div>
      <div className="thirdDiv d-flex justify-content-around align-items-center">
        <div className="">
          <button className="btn btn-primary d-block">Upload</button>
        </div>
      </div>
    </div>

    // cardType, description, checkItem, user, status
  );
};

export default RaiseCard;
