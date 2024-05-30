import React from "react";
import styles from "./styles/smilecard.module.css";


function FlowSmileCard(props) {
 
  return (
    <div>
      <div className="d-sm-flex flex-wrap justify-content-center">
        <div className={`align-self-center border border-dark p-2 col-1  `}>
          <h6 className="text-center align-center">SC</h6>
        </div>
        <div className={`align-self-center p-2 m-3`}>
          <i
            className="bi bi-arrow-right-square "
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2`}
          // style={{ width: "200px" }}
        >
          <h6>TL has to inform on daily basic to TM to carryout inspection</h6>
        </div>
        <div className={`align-self-center  p-2 m-3 `}>
          <i
            className="bi bi-arrow-right-square"
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2 `}
          // style={{ width: "200px" }}
        >
          <h6>TM to carryout the inspection & inform to TL</h6>
        </div>
        <div className={`align-self-center  p-2 m-3 `}>
          <i
            className="bi bi-arrow-right-square"
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2 `}
          // style={{ width: "200px" }}
        >
          <h6>TL has to raise the tag</h6>
        </div>
      </div>

      <div className="d-sm-flex flex-wrap justify-content-center">
        <div className={`align-self-center border border-dark p-2 col-1 `}>
          <h6 className="text-center align-center">RMI</h6>
        </div>
        <div className={`align-self-center p-2 m-3 `}>
          <i
            className="bi bi-arrow-right-square "
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2`}
          // style={{ width: "200px" }}
        >
          <h6>Type 3 members has to pick the tab</h6>
        </div>
        <div className={`align-self-center  p-2 m-3 `}>
          <i
            className="bi bi-arrow-right-square"
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2 `}
          // style={{ width: "200px" }}
        >
          <h6>carry out the inspection</h6>
        </div>
        <div className={`align-self-center  p-2 m-3 col-1`}>
          <i
            className="bi bi-arrow-right-square"
            style={{ fontSize: "2rem", color: "cornflowerblue" }}
          ></i>
        </div>
        <div
          className={`align-self-center border border-dark p-2 col-2 `}
          // style={{ width: "200px" }}
        >
          <h6>Type 3 members has to raise the tag</h6>
        </div>
      </div>
    </div>
  );
}

export default FlowSmileCard;
