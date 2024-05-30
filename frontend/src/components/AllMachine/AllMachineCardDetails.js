import React, { useState, useEffect } from "react";
import styles from "../styles/smilecard.module.css";
import { useSelector } from "react-redux";

export default function AllMachineSmileCardDetails({ list }) { 

  let {
    cardNo,
    d,
    line,
    model,
    processNo,
    cycle,
    workOnePoint,
    workDetail,
    tool,
    criterion,
    images,
    _id,
    pS,
    value,   
    methodWssNo,
    rS,
    workManpower,
    areaToInspect,
    workTime,
  } = list;
  const [okNg, setOkNg] = useState("decisionPending");
  const [valueM, setValueM] = useState(value);
  const [remarks, setRemarks] = useState(null);
  var bgColor = rS == "R" ? "red" : "green";
  

  const image= images[0]
  return (
    // <div style={{ height: "65vh" }} className="overflow-auto">
    //   <div className="d-sm-flex flex-wrap">
    //     <div
    //       className={`${styles.brA} ${styles.center} col-sm-3 align-self-stretch `}
    //       style={{ backgroundColor: `${bgColor}` }}
    //     >
    //       <h6 className={`${styles.scTh} h2`}>
    //         {pS === "P" ? "TBM Card" : `Smile Card `}
    //         <spam className={"h3"}> - {rS === "R" ? "RMI" : "OM"}</spam>
    //       </h6>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Matrix Card No</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Legend No</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{cardNo}</p>
    //       </div>
    //     </div>

    //     {/* <div className={`col-md-1 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Day</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>
    //           {d[0] === 9999 ? "All days" : d[0]}
    //         </p>
    //       </div>
    //     </div> */}

    //     <div className={`col-md-2 col-sm-2  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Line</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{line}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Machine no</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{model}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-1 col-sm-2  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>OP no</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{processNo}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Inspection Item</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{workDetail}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-1 col-sm-2  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Frequency</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{cycle}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-4 col-sm-6  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Area to inspect</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{workOnePoint}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Inspection Method</h6>
    //       </div>
    //       <div className={`${styles.brT} align-self-stretch`}>
    //         <p className={`${styles.scTd}`}>{tool}</p>
    //       </div>
    //     </div>

    //     <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
    //       <div>
    //         <h6 className={`${styles.scTh}`}>Criteria</h6>
    //       </div>
    //       <div className={styles.brT}>
    //         <p className={`${styles.scTd}`}>{criterion}</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="d-sm-flex   " style={{ height: "55vh" }}>
    //     <div className="col-sm-7">
    //       <img
    //         src={
    //           images[0] === null || images[0] === undefined
    //             ? "/noImageAdded.png"
    //             : `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/assets/images/${images[0]}`
    //         }
    //         alt="Details_Photo"
    //         style={{ width: "auto", height: "50vh" }}
    //       ></img>
    //       <div>{images[0]}</div>
    //     </div>
    //   </div>
    //   <div className="col-sm-5 bg-secondary"></div>
    // </div>

    <div style={{ height: "65vh" }} className="overflow-auto">
    <div className="d-sm-flex flex-wrap">
      <div
        className={`${styles.brA} ${styles.center} col-sm-3 align-self-stretch `}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <h6 className={`${styles.scTh} h2`}>
          {pS === "P" ? "TBM Card" : `Smile Card `}
          <spam className={"h3"}> - {rS === "R" ? "RMI" : "OM"}</spam>
        </h6>
      </div>

      <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {" "}
            {pS == "S" ? "Matrix Card No." : "Control No"}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{cardNo}</h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {" "}
            {pS == "S" ? "Ledger No." : "WSS No."}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{methodWssNo}</h6>
        </div>
      </div>

      <div className={`col-md-1 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>Day</h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>
            {d[0] === 9999 ? "All days" : d[0]}
          </h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-2  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {pS == "S" ? "Line/Group" : "Line"}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{line}</h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>Machine no</h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{model}</h6>
        </div>
      </div>

      <div className={`col-md-1 col-sm-2  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {" "}
            {pS == "S" ? "Station / Line" : "OP no"}{" "}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{processNo}</h6>
        </div>
      </div>

      <div className={`col-md-3 col-sm-4  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {pS == "S" ? "Inspection Item" : "Work Detail"}{" "}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{workDetail}</h6>
        </div>
      </div>

      <div className={`col-md-1 col-sm-2  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>Frequency</h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{cycle}</h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-2  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {pS == "S" ? "Area to inspect" : "No. of members"}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>
            {workManpower}
          </h6>
        </div>
      </div>
      <div className={`col-md-1 col-sm-1  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {pS == "S" ? "Time" : "Total Manhours"}
          </h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{workTime}</h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>
            {pS == "S" ? "Inspection Method" : "Tools"}
          </h6>
        </div>
        <div className={`${styles.brT} align-self-stretch`}>
          <h6 className={`${styles.scTd}`}>{tool}</h6>
        </div>
      </div>

      <div className={`col-md-2 col-sm-3  align-self-stretch  ${styles.brA}`}>
        <div>
          <h6 className={`${styles.scTh}`}>Criteria</h6>
        </div>
        <div className={styles.brT}>
          <h6 className={`${styles.scTd}`}>{criterion}</h6>
        </div>
      </div>
    </div>

    <div className="d-sm-flex   " style={{ height: "55vh" }}>
      <div className="col-sm-7 ">
        <img
          src={
            image === null || image === undefined
              ? "/noImageAdded.png"
              : `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/assets/images/${image}`
          }
          alt="Details_Photo"
          style={{
            width: image === null || image === undefined ? "20vW" : "58.33vw",
            height: "auto",
          }}
        ></img>
        <div>{image}</div>
      </div>

      <div className="col-sm-5 bg-secondary">
      
      </div>
    </div>
   
  </div>
  );
}
