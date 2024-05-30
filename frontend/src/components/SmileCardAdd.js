import React, { useState } from "react";
// import styles from "./styles/smilecard.module.css";
import axios from "axios";
import "./table.css";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import FlavorForm from "./MultipleOptions";

function SmileCardAdd() {
  const { pS } = useSelector((state) => state.filters);

  const [selectedFile, setSelectedFile] = useState("");

  const selectedFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [actionNew, setActionNew] = useState("");
  const [cardNoNew, setCardNoNew] = useState("");
  const [categoryCtrlNew, setCategoryCtrlNew] = useState("");
  const [commonItemNew, setCommonItemNew] = useState("");
  const [criterionNew, setCriterionNew] = useState("");
  const [cycleNew, setCycleNew] = useState("");
  const [dNew, setDNew] = useState([9999]);
  const [entryDateNew, setEntryDateNew] = useState(new Date(Date.now()));
  const [holidayOperationNew, setHolidayOperationNew] = useState("");
  const [imagesNew, setImagesNew] = useState("");
  const [lineNew, setLineNew] = useState("");
  const [mNew, setMNew] = useState([9999]);
  const [methodWssNoNew, setMethodWssNoNew] = useState("");
  const [modelNew, setModelNew] = useState("");
  const [pSNew, setPSNew] = useState("S");
  const [prepManHrNew, setPrepManHrNew] = useState("");
  const [processNoNew, setProcessNoNew] = useState("");
  const [qualityOnePointNew, setQualityOnePointNew] = useState("");
  const [rSNew, setRSNew] = useState("R");
  const [reasonNew, setReasonNew] = useState("");
  const [remarkNew, setRemarkNew] = useState("");
  const [safetyOnePointNew, setSafetyOnePointNew] = useState("");
  const [toolNew, setToolNew] = useState("");
  const [wNew, setWNew] = useState([9999]);
  const [wHrNew, setWHrNew] = useState("");
  const [workDetailNew, setWorkDetailNew] = useState("");
  const [workManpowerNew, setWorkManpowerNew] = useState("");
  const [workOnePointNew, setWorkOnePointNew] = useState("");
  const [workTimeNew, setWorkTimeNew] = useState("");
  const [yNew, setYNew] = useState([9999]);
  const [areaToInspectNew, setAreaToInspectNew] = useState("");
  const [groupNew, setGroupNew] = useState("");

  // const optionsLine = [
  //   { value: "Block", label: "Block Line" },
  //   { value: "Head", label: "Head Line" },
  //   { value: "Crank", label: "Crank Line" },
  //   { value: "Assembly", label: "Assembly Line" },
  // ];
  // const optionsPS = [
  //   { value: "P", label: "Maintenace dept." },
  //   { value: "S", label: "Production dept." },
  // ];
  const optionsRS = [
    { value: "R", label: "Running Check" },
    { value: "S", label: "Stop Check" },
  ];

  const optionsYear = [
    { value: 9999, label: "Every Year" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
    { value: 2031, label: "2031" },
    { value: 2032, label: "2032" },
    { value: 2033, label: "2033" },
    { value: 2034, label: "2034" },
    { value: 2035, label: "2035" },
  ];
  const optionsMonth = [
    { value: 9999, label: "Every Month" },
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
  ];
  const optionsWeek = [
    { value: 9999, label: "Every Week" },
    { value: 1, label: "Week 1" },
    { value: 2, label: "Week 2" },
    { value: 3, label: "Week 3" },
    { value: 4, label: "Week 4" },
    { value: 5, label: "Week 5" },
  ];

  const optionsDay = [
    { value: 9999, label: "Every Day" },
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
    { value: 7, label: "Sun" },
  ];

  const optionsGroup = [  
    
    { value: "white", label:"White Group" },
    { value: "yellow", label: "Yellow Group" },
  ];

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", selectedFile);

    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/uploadImage`,
        formData,
        {
          headers: { "Content-Type": "Multipart/form-data" },
        }
      )
      .then((result) => {
        setImagesNew(result.data.file.filename);
        if (result.data.success) {
          toast.success(
            `Image uploaded successfully, Name of file ${result.data.file.filename}`
          );
        }
      })
      .catch((err) => {
        console.log("error uploading image", err);
        toast.success(
          `Failed to upload Image, choose correct Image file with file extension .png/.jpg`
        );
      });
  };

  const saveData = (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log("entryValue :", entryDateNew);

    // formData.append("image", selectedFile);

    formData.append("images", imagesNew);
    //// formData.append("createdAt" ,createdAtNew);

    formData.append("action", actionNew);
    formData.append("cardNo", cardNoNew);
    formData.append("criterion", criterionNew);
    formData.append("cycle", cycleNew);
    formData.append("d", dNew);
    formData.append("line", lineNew);
    formData.append("model", modelNew);
    formData.append("processNo", processNoNew);
    formData.append("tool", toolNew);
    formData.append("workDetail", workDetailNew);
    formData.append("workOnePoint", workOnePointNew);
    formData.append("categoryCtrl", categoryCtrlNew);
    formData.append("commonItem", commonItemNew);
    formData.append("entryDate", new Date(Date.now()));
    formData.append("holidayOperation", holidayOperationNew);
    formData.append("m", mNew);
    formData.append("methodWssNo", methodWssNoNew);

    //formData.append("pS", pSNew);
    formData.append("pS", pS);

    formData.append("prepManHr", prepManHrNew);
    formData.append("qualityOnePoint", qualityOnePointNew);
    formData.append("rS", rSNew);
    formData.append("reason", reasonNew);
    formData.append("remark", remarkNew);
    formData.append("safetyOnePoint", safetyOnePointNew);
    formData.append("w", wNew);
    formData.append("wHr", wHrNew);
    formData.append("workManpower", workManpowerNew);
    formData.append("workTime", workTimeNew);
    formData.append("y", yNew);
    formData.append("group", groupNew);

    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/insertData`,
        formData,
        {
          headers: { "Content-Type": "Multipart/form-data" },
        }
      )
      .then((result) => {
        toast.success(`Data uploaded successfully`);
      })
      .catch((err) => {
        console.log(err.message);
        console.log("error uploading Data", err);
        toast.error(
          err.response.data.message
          // `failed to upload data, Fill all data with correct Data type`
        );
      });
  };

  return (
    <div className="mx-3">
      {/* <hr /> */}

      <div className="d-flex">
        <button className="btn btn-outline-primary " onClick={uploadImage}>
          Save Image
        </button>
        <div className="imgTagCol mx-1">Image :</div>
        <div className="secondCol">
          <div className="form-group">
            <input
              type="file"
              id="uploadImage"
              className="form-control"
              onChange={selectedFileHandler}
            />
          </div>
        </div>
      </div>

      <hr />
      <button className="btn btn-outline-primary" onClick={saveData}>
        Save Data
      </button>

      <h6 className="d-inline">
        {" "}
        <span className="text-danger mx-3"> * </span>Mandatory Fields
      </h6>

      <div className="overflow-auto" style={{ height: "55vh" }}>
        <ol className="d-flex flex-wrap justify-content-around">
          {/* <FlavorForm /> */}

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {/* <span className="text-danger">* </span> */}
                Line
                <span className="text-danger">* </span>:
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={lineNew}
                  onChange={(e) => setLineNew(e.target.value)}
                  placeholder="Please enter line Name, Example Block"
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {pS === "S" ? "Station / Line" : "OP no."}
                <span className="text-danger">* </span> :
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={processNoNew}
                  onChange={(e) => setProcessNoNew(e.target.value)}
                  placeholder="Please enter OP No., Example OP10"
                  // disabled
                />
              </div>
            </div>
          </li>
          <li>
          <div className="d-flex">
            <div className="firstCol">
              Group
            </div>
            <div className="secondCol">
            <Select
                options={optionsGroup}
                defaultValue={{ value: groupNew, label: ""}}
                onChange={(e) => setGroupNew(e.value)}                
              />
            </div>
           
          </div>
        </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {pS === "S" ? "Inspection Item " : "Work Detail "}
                <span className="text-danger">* </span> :
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={workDetailNew}
                  onChange={(e) => setWorkDetailNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {pS === "S" ? "Inspection Method :" : "Tools :"}
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={toolNew}
                  onChange={(e) => setToolNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                Running/Stop Check<span className="text-danger">* </span> :
              </div>
              <div className="secondCol">
                <Select
                  options={optionsRS}
                  defaultValue={{
                    value: rSNew,
                    label: rSNew === "R" ? "Running Check" : "Stop Check",
                  }}
                  onChange={(e) => setRSNew(e.value)}
                />
              </div>
            </div>
          </li>
          {/* <li>
            <div className="d-flex">
              <div className="firstCol">Maintenance/Production Check :</div>
              <div className="secondCol">
                <Select
                  options={optionsPS}
                  defaultValue={{
                    value: pSNew,
                    label:
                      pSNew === "P" ? "Maintenance dept." : "Production dept.",
                  }}
                  isDisabled={false}
                  onChange={(e) => setPSNew(e.value)}
                />
              </div>
            </div>
          </li> */}

          <li>
            <div className="d-flex">
              <div className="firstCol">cycle :</div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={cycleNew}
                  onChange={(e) => setCycleNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {" "}
                {pS === "S" ? "Time :" : "Total Manhours :"}
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={workTimeNew}
                  onChange={(e) => setWorkTimeNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">Day
              <span className="text-danger">* </span>:
              </div>
              
              <div className="secondCol">
                <Select
                  options={optionsDay}
                  isMulti={true}
                  defaultValue={{
                    value: dNew,
                    label: dNew[0] === 9999 ? "Every Day" : dNew,
                  }}
                  onChange={(e) => {
                    let newArray = [];
                    e.forEach((item) => {
                      if (typeof item.value === "object") {
                        item.value.forEach((subitem) => {
                          newArray.push(item.value[0]);
                        });
                      } else {
                        newArray.push(item.value);
                      }
                    });
                    setDNew(newArray);
                  }}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">Week
              <span className="text-danger">* </span>:
              </div>
              <div className="secondCol">
                <Select
                  options={optionsWeek}
                  isMulti={true}
                  defaultValue={{
                    value: wNew,
                    label: wNew[0] === 9999 ? "Every Week" : wNew,
                  }}
                  onChange={(e) => {
                    let newArray = [];
                    e.forEach((item) => {
                      if (typeof item.value === "object") {
                        item.value.forEach((subitem) => {
                          newArray.push(item.value[0]);
                        });
                      } else {
                        newArray.push(item.value);
                      }
                    });
                    setWNew(newArray);
                  }}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">optionsMonth
              <span className="text-danger">* </span>:
              </div>
              <div className="secondCol">
                <Select
                  options={optionsMonth}
                  isMulti={true}
                  defaultValue={{
                    value: mNew,
                    label: mNew[0] === 9999 ? "Every Month" : mNew,
                  }}
                  onChange={(e) => {
                    let newArray = [];
                    e.forEach((item) => {
                      if (typeof item.value === "object") {
                        item.value.forEach((subitem) => {
                          newArray.push(item.value[0]);
                        });
                      } else {
                        newArray.push(item.value);
                      }
                    });
                    setMNew(newArray);
                  }}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">optionsYear
              <span className="text-danger">* </span>:
              </div>
              <div className="secondCol">
                <Select
                  options={optionsYear}
                  isMulti={true}
                  defaultValue={{
                    value: yNew,
                    label: yNew[0] === 9999 ? "Every Year" : yNew,
                  }}
                  onChange={(e) => {
                    let newArray = [];
                    e.forEach((item) => {
                      if (typeof item.value === "object") {
                        item.value.forEach((subitem) => {
                          newArray.push(parseInt(item.value[0]));
                        });
                      } else {
                        newArray.push(parseInt(item.value));
                      }
                    });
                    setYNew(newArray);
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex">
              <div className="firstCol">Images :</div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={imagesNew}
                  onChange={(e) => setImagesNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">Model :</div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={modelNew}
                  onChange={(e) => setModelNew(e.target.value)}
                />
              </div>
            </div>
          </li>

          <li>
            <div className="d-flex">
              <div className="firstCol">
                {" "}
                {pS === "S" ? "Matrix Card No. :" : "Control No :"}
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={cardNoNew}
                  onChange={(e) => setCardNoNew(e.target.value)}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="d-flex">
              <div className="firstCol">
                {" "}
                {pS === "S" ? "Ledger No." : "WSS No."}
              </div>
              <div className="secondCol">
                <input
                  className="form-control"
                  value={methodWssNoNew}
                  onChange={(e) => setMethodWssNoNew(e.target.value)}
                />
              </div>
            </div>
          </li>
          {/* Either "area to inspect" or "work Man power" will be displayed in the front end */}
          <li>
            <div className="d-flex">
              <div className="firstCol">
                {" "}
                {pS === "S" ? "Area to inspect" : "No. of members"}
              </div>
              <div className="secondCol">
                
                  <input
                    className="form-control"
                    value={workManpowerNew}
                    onChange={(e) => setWorkManpowerNew(e.target.value)}
                  />
                
              </div>
            </div>
          </li>

          {/* <li>
          <div className="d-flex">
            <div className="firstCol">Entry Date :</div>
            <div className="secondCol">
              <input
                className="form-control"
                value={entryDateNew}
                onChange={(e) => setEntryDateNew(e.target.value)}
              />
            </div>
          </div>
        </li> */}

          {/*  below items not to be displayed for production dept*/}

          {pS === "S" ? null : (
            <>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Holiday Operation :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={holidayOperationNew}
                      onChange={(e) => setHolidayOperationNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="firstCol">Reason :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={reasonNew}
                      onChange={(e) => setReasonNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="firstCol">Remark :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={remarkNew}
                      onChange={(e) => setRemarkNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="firstCol">Action :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={actionNew}
                      onChange={(e) => setActionNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Prep ManHr :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={prepManHrNew}
                      onChange={(e) => setPrepManHrNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">w Hr :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={wHrNew}
                      onChange={(e) => setWHrNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Work One Point :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={workOnePointNew}
                      onChange={(e) => setWorkOnePointNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="firstCol">Quality One Point :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={qualityOnePointNew}
                      onChange={(e) => setQualityOnePointNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Safety One Point:</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={safetyOnePointNew}
                      onChange={(e) => setSafetyOnePointNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="firstCol">Category Control :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={categoryCtrlNew}
                      onChange={(e) => setCategoryCtrlNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Common Item:</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={commonItemNew}
                      onChange={(e) => setCommonItemNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="firstCol">Criterion :</div>
                  <div className="secondCol">
                    <input
                      className="form-control"
                      value={criterionNew}
                      onChange={(e) => setCriterionNew(e.target.value)}
                    />
                  </div>
                </div>
              </li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
}

export default SmileCardAdd;
