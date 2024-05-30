import React, { useState } from "react";
// import styles from "./styles/smilecard.module.css";
import axios from "axios";
import "./table.css";
import Select from "react-select";
// import FlavorForm from "./MultipleOptions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import DatePicker from "react-date-picker";

function SmileCardDetails({ list, image, setImage }) {
  const [selectedFile, setSelectedFile] = useState("");

  const auth = useSelector((state) => state.auth);
  const { machineData } = useSelector((state) => state.machines);
  const optionsLine = machineData.machineData.map((element) => {
    return { value: element.line, label: element.line };
  });

  const level = auth.user ? auth.user.level : 0;

  const selectedFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let {
    action,
    cardNo,
    criterion,
    cycle,
    d,
    images,
    line,
    model,
    processNo,
    tool,
    workDetail,
    workOnePoint,
    categoryCtrl,
    commonItem,
    // createdAt,
    entryDate,
    holidayOperation,
    m,
    methodWssNo,
    pS,
    prepManHr,
    qualityOnePoint,
    rS,
    reason,
    remark,
    safetyOnePoint,
    w,
    wHr,
    workManpower,
    workTime,
    y,
    _id,
    group
  } = list;

  const [actionNew, setActionNew] = useState(action === null ? "" : action);
  const [cardNoNew, setCardNoNew] = useState(cardNo === null ? "" : cardNo);
  const [groupNew, setGroupNew] = useState(group === null ? "" : group);

  const [categoryCtrlNew, setCategoryCtrlNew] = useState(
    categoryCtrl === null ? "" : categoryCtrl
  );
  const [commonItemNew, setCommonItemNew] = useState(
    commonItem === null ? "" : commonItem
  );
  // const [createdAtNew, setCreatedAtNew] = useState(
  //   commonItem === null ? "" : commonItem
  // );
  const [criterionNew, setCriterionNew] = useState(
    criterion === null ? "" : criterion
  );
  const [cycleNew, setCycleNew] = useState(cycle === null ? "" : cycle);
  const [dNew, setDNew] = useState(d === null ? "" : d);
  const [entryDateNew, setEntryDateNew] = useState(
    entryDate == null
      ? new Date(Date.now())
      : typeof entryDate == "object"
      ? entryDate
      : new Date(entryDate)
    //  entryDate
  );
  console.log(typeof new Date());
  const [holidayOperationNew, setHolidayOperationNew] = useState(
    holidayOperation === null ? "" : holidayOperation
  );
  const [imagesNew, setImagesNew] = useState(images === null ? "" : images);
  const [lineNew, setLineNew] = useState(line === null ? "" : line);
  const [mNew, setMNew] = useState(m === null ? "" : m);
  const [methodWssNoNew, setMethodWssNoNew] = useState(
    methodWssNo === null ? "" : methodWssNo
  );
  const [modelNew, setModelNew] = useState(model === null ? "" : model);
  const [pSNew, setPSNew] = useState(pS === null ? "" : pS);
  const [prepManHrNew, setPrepManHrNew] = useState(
    prepManHr === null ? "" : prepManHr
  );
  const [processNoNew, setProcessNoNew] = useState(
    processNo === null ? "" : processNo
  );
  const [qualityOnePointNew, setQualityOnePointNew] = useState(
    qualityOnePoint === null ? "" : qualityOnePoint
  );
  const [rSNew, setRSNew] = useState(rS === null ? "" : rS);
  const [reasonNew, setReasonNew] = useState(reason === null ? "" : reason);
  const [remarkNew, setRemarkNew] = useState(remark === null ? "" : remark);
  const [safetyOnePointNew, setSafetyOnePointNew] = useState(
    safetyOnePoint === null ? "" : safetyOnePoint
  );
  const [toolNew, setToolNew] = useState(tool === null ? "" : tool);
  const [wNew, setWNew] = useState(w === null ? "" : w);
  const [wHrNew, setWHrNew] = useState(wHr === null ? "" : wHr);
  const [workDetailNew, setWorkDetailNew] = useState(
    workDetail === null ? "" : workDetail
  );
  const [workManpowerNew, setWorkManpowerNew] = useState(
    workManpower === null ? "" : workManpower
  );
  const [workOnePointNew, setWorkOnePointNew] = useState(
    workOnePoint === null ? "" : workOnePoint
  );
  const [workTimeNew, setWorkTimeNew] = useState(
    workTime === null ? "" : workTime
  );
  const [yNew, setYNew] = useState(y === null ? "" : y);

  const optionsPS = [
    { value: "P", label: "Maintenace dept." },
    { value: "S", label: "Production dept." },
  ];
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
    formData.append("_id", _id);
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
        setImage(result.data.file.filename);
        if (result.data.success) {
          toast.success(
            `Image uploaded successfully, Name of file ${result.data.file.filename}`
          );
        }
      })
      .catch((err) => {
        console.log("error uploading image", err);
        toast.error(
          `Failed to upload Image, choose correct Image file with file extension .png/.jpg`
        );
      });
  };

  const saveData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("Id:", _id);
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
    formData.append("entryDate", entryDateNew);
    formData.append("holidayOperation", holidayOperationNew);
    formData.append("m", mNew);
    formData.append("methodWssNo", methodWssNoNew);
    formData.append("pS", pSNew);
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
    formData.append("_id", _id);
    formData.append("group", groupNew);

    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/saveData`,
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
        toast.error(`failed to upload data, ${err.message}`);
      });
  };

  return (
    <div className="mx-3  ">
      <hr />

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
      <div className="d-flex ">
        <button className="btn btn-outline-primary" onClick={saveData}>
          Save Data
        </button>
        <h6 className="d-inline">
          {" "}
          <span className="text-danger mx-3"> * </span>Mandatory Fields
        </h6>
      </div>

      <ol
        className="d-flex flex-wrap justify-content-around overflow-auto "
        style={{ height: "40vh" }}
      >
        {/* <FlavorForm /> */}

        <li>
          <div className="d-flex">
            <div className="firstCol">
              Line
              <span className="text-danger">* </span>:
            </div>
            <div className="secondCol">
              <Select
                options={optionsLine}
                defaultValue={{ value: lineNew, label: `${lineNew} line` }}
                onChange={(e) => setLineNew(e.value)}
                isDisabled={level >= 100 ? false : true}
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
                disabled={level >= 100 ? false : true}
                required
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
                required
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
        <li>
          <div className="d-flex">
            <div className="firstCol">
              Maintenance/Production Check
              <span className="text-danger">* </span> :
            </div>
            <div className="secondCol">
              <Select
                options={optionsPS}
                defaultValue={{
                  value: pSNew,
                  label:
                    pSNew === "P" ? "Maintenance dept." : "Production dept.",
                }}
                isDisabled={level >= 100 ? false : true}
                onChange={(e) => setPSNew(e.value)}
              />
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex">
            <div className="firstCol">Cycle :</div>
            <div className="secondCol">
              <input
                className="form-control"
                value={cycleNew}
                onChange={(e) => setCycleNew(e.target.value)}
                required
              />
            </div>
          </div>
        </li>
        <li>
          <div className="d-flex">
            <div className="firstCol">
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
            <div className="firstCol">
              Group
            </div>
            <div className="secondCol">
            <Select
                options={optionsGroup}
                defaultValue={{ value: groupNew, label:  groupNew!="undefined" ? `${groupNew } Group` :""}}
                onChange={(e) => setGroupNew(e.value)}
                isDisabled={level >= 100 ? false : true}
              />
            </div>
           
          </div>
        </li>
        <li>
          <div className="d-flex">
            <div className="firstCol">
              Day<span className="text-danger">* </span> :
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
            <div className="firstCol">
              Week<span className="text-danger">* </span> :
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
            <div className="firstCol">
              Month<span className="text-danger">* </span> :
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
            <div className="firstCol">
              Year<span className="text-danger">* </span> :
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
            <div className="firstCol">Entry Date :</div>
            <div className=" secondCol  ">
              <DatePicker
                value={entryDateNew}
                onChange={setEntryDateNew}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                clearIcon={null}
              />
            </div>
          </div>
        </li>

        <li>
          <div className="d-flex">
            <div className="firstCol">
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
       
   
        {/* below items not required to be displayed for production  */}
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
                <div className="firstCol">criterion :</div>
                <div className="secondCol">
                  <input
                    className="form-control"
                    value={criterionNew}
                    onChange={(e) => setCriterionNew(e.target.value)}
                    required
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
          </>
        )}
      </ol>
    </div>
  );
}

export default SmileCardDetails;
