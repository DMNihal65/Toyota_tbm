import React, { useState, useEffect } from "react";
import styles from "./styles/smilecard.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import TrendGraphModal from "./TrendGraphModal";
import { useCookies } from "react-cookie";
import ImageModal from "./ImageModal";

function SmileCardDetails({ list, image, setImage, setRecordAbnormalityShowModal }) {
  const [showModal, setShowModal] = useState(false);
  const [cookies] = useCookies(["userId"]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const filters = useSelector((state) => state.filters);
  const { userId } = cookies;

  const [showModalImage, setShowModalImage] = useState(false);
  const checkedByNew = useSelector((state) => state.checkedBy);

  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;

  let {
    cardNo,
    d,
    line,
    model,
    processNo,
    cycle,
    workDetail,
    tool,
    criterion,
    images,
    _id,
    pS,
    dailyStatus,
    value,
    methodWssNo,
    rS,
    workManpower,
    areaToInspect,
    workTime,
    judgementRemarks,
    checkedBy,
  } = list;
  const [okNg, setOkNg] = useState(dailyStatus);
  const [valueM, setValueM] = useState(value);
  const [remarks, setRemarks] = useState(judgementRemarks);

  var bgColor = rS == "R" ? "red" : "green";

  useEffect(() => {
    if (images !== null) {
      setImage(images[0]);
    }
  }, []);

  console.log(list);
  // const selectedDate = new Date(Date.now());
  // const entryForYear = selectedDate.getFullYear();
  // const entryForMonth = selectedDate.getMonth() + 1;
  // const entryForDate = selectedDate.getDate();
  const entryFor = `${filters.y}-${filters.m}-${filters.dt}`;

  const dailyEntry = (e) => {
    if (!isAuthenticated) {
      toast.warning("Login required");
    } else {
      let data = {
        checkItem: _id,
        result: okNg === "OK" ? "OK" : okNg === "NG" ? "NG" : "not judge",
        value: valueM,
        user: userId,
        entryFor,
        pS,
        remarks,
        checkedBy: checkedByNew,
      };

      if(okNg=="NG"){
        axios
        .get(
          `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/findByIdAndDate`,{
            params:{
              id:_id,
              date:new Date().toISOString().split('T')[0]
            }
          }
        )
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            toast.success("Abnormality found");
            axios
          .post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/entry`,
            data
          )
          .then((result) => {
            if (result.data.success) {
              toast.success("saved data");
            }
          })
          .catch((err) => {
            // console.log("error ", err);
            toast.error(`Data could not be saved , ${err.message}`);
          });
          }else{
            setRecordAbnormalityShowModal(true)
            toast.warn("Abnormality required before marking NG");
          }
        })
        .catch((err) => {
          // console.log("error ", err);
          toast.error(`Data could not be saved , ${err.message}`);
        });
      }
      if (okNg === "OK") {
        
        axios
          .post(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/entry`,
            data
          )
          .then((result) => {
            if (result.data.success) {
              toast.success("saved data");
            }
          })
          .catch((err) => {
            // console.log("error ", err);
            toast.error(`Data could not be saved , ${err.message}`);
          });
      } 
      if (okNg !== "OK" && okNg !== "NG") {
        axios
        .post(
          `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/removeEntry`,
          {
            checkItem:data.checkItem,
            entryFor:data.entryFor
          }
        )
          .then((result) => {
            if (result.data.success) {
              toast.success("saved data");
            }
          })
          .catch((err) => {
            // console.log("error ", err);
            toast.error(`Data could not be saved , ${err.message}`);
          });
        // toast.warning("Please judge OK or NG");
      }
    }
  };
  const resetHandler = () => {
    setOkNg(null);
    setValueM(null);
    setRemarks(null);
  };

  return (
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
            <h6 className={`${styles.scTd}`}>{workManpower}</h6>
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

      <div className="d-sm-flex  " style={{ maxHeight: "35vh" }}>
        <div className="col-sm-7 ">
          <img
            src={
              image === null || image === undefined
                ? "/noImageAdded.png"
                : `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/assets/images/${image}`
            }
            alt="Details_Photo"
            style={{
              // maxWidth: image === null || image === undefined ? "20vW" : "55vw",
              // maxHeight: "auto",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            className="mx-2 my-1 object-fit-contain"
            onClick={() => setShowModalImage(true)}
          ></img>
          <div>{image}</div>
        </div>

        <div className="col-sm-5 bg-secondary">
          <div className="d-flex ">
            <div className="d-flex flex-column">
              <button
                className="btn btn-primary mr-1"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-graph-up-arrow h4"> Graph</i>
              </button>
              <img
                src={`${okNg}.png`}
                alt="Not Evaluated"
                style={{ width: "17vw", height: "17vw" }}
              ></img>
            </div>
            <div
              style={{ width: "24.5vw" }}
              className="d-flex flex-column justify-content "
            >
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-center text-light mx-3">
                  Judgement -{" "}
                  <spam style={{ fontSize: "0.7rem" }}>
                    Done by : {checkedBy}
                  </spam>
                </h6>
                {level >= 20 && (
          <button
          className="btn btn-sm btn-primary"
          onClick={resetHandler}
        >
          Reset
        </button>
        )}
                
              </div>

              <input
                className="bg-light my-1"
                type="number"
                placeholder="Enter actual value"
                value={valueM}
                onChange={(e) => setValueM(e.target.value)}
              ></input>

              <textarea
                type="text"
                className="bg-light my-1"
                placeholder="Enter Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>

              <button
                className="btn btn-success  my-1"
                onClick={() => setOkNg("OK")}
              >
                <i className="bi bi-circle"></i>
              </button>
              <button
                className="btn btn-danger  my-1 "
                onClick={() => setOkNg("NG")}
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <button
                className="btn btn-warning  my-1 "
                onClick={() => setOkNg("decisionPending")}
              >
                Pending
              </button>

              <button
                className="btn  btn-primary  my-1"
                style={{ width: "100%" }}
                onClick={dailyEntry}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // trend graph in modal */}
      {showModal ? (
        <TrendGraphModal
          showModal={showModal}
          setShowModal={setShowModal}
          id={_id}
          // checkItem={checkItem._id}
          // line={line}
          // processNo={processNo}
          // workDetail={checkItem.workDetail}
          // abnormality={abnormality}
          // cardType={cardType}
          // // countermeasure={countermeasure}
          // // spare={spare}
          // // pic={pic}
          // // targetDate={targetDate}
          // status={status}
          // fromDateSt={fromDateSt}
          //  toDateSt={toDateSt}
        />
      ) : null}

      {showModalImage ? (
        <ImageModal
          showModal={showModalImage}
          setShowModal={setShowModalImage}
          image={image}
        />
      ) : null}
    </div>
  );
}

export default SmileCardDetails;
