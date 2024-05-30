import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; 

function AbnormalityRecord() {
  let info = {};
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  for (const e of searchParams.entries()) {
    let [f, v] = e;
    info[f] = v;
  }

  const { line, processNo, workDetail, itemId } = info;

  const auth = useSelector((state) => state.auth);

  const user =  auth.user._id;

  const [abnormality, setAbnormality] = useState("");
  const [countermeasure, setCountermeasure] = useState("");
  const [target, setTarget] = useState("");
  const [pic, setPic] = useState("");
  const [spare, setSpare] = useState("");
  const [status, setStatus] = useState("");
  // const [remarks, setRemarks] = useState();

  const options = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "complete", label: "Complete" },
  ];

  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/create`,
        {
          checkItem: itemId,
          abnormality,
          countermeasure,
          targetDate: target,
          pic,
          user,
          line,
          processNo,
          spare,
          status,
        }
        // , { withCredentials: true }
      )
      .then((result) => {
        toast.success("Saved Successfully");
        navigate(`/checkList?line=${line}&processNo=${processNo}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please fill Abnormility Details");
      });
  };

  return (
    <div>
      <div>
        <h3 className="mx-3 p-1 bg-info text-center ">Record Abnormility</h3>

        <div className="d-flex flex m-4">
          <span className="mx-3">
            Line : <span className="h5">{line}</span>
          </span>
          <span className="mx-3">
            OP No : <span className="h5">{processNo}</span>
          </span>
          <span className="mx-3">
            Inspection Item : <span className="h5">{workDetail}</span>
          </span>
        </div>
        <form onSubmit={formHandler} className="form-group mx-3">
          <label htmlFor="ab">Abnormility Details</label>
          <textarea
            className="form-control"
            type="text"
            id="ab"
            value={abnormality}
            onChange={(e) => setAbnormality(e.target.value)}
          />
          <label htmlFor="ac">Countermeasure</label>
          <textarea
            className="form-control"
            type="text"
            id="ac"
            value={countermeasure}
            onChange={(e) => setCountermeasure(e.target.value)}
          />

          <label htmlFor="spares">Spare Required</label>
          <input
            className="form-control"
            type="text"
            id="spares"
            value={spare}
            onChange={(e) => setSpare(e.target.value)}
          />
          <div className="d-flex justify-content-betweem my-2">
            <div className="me-3 d-flex flex-column">
              <label className="me-1" htmlFor="pic">
                PIC{" "}
              </label>
              <input
                type="text"
                id="pic"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
              />
            </div>
            <div className="mx-3 d-flex flex-column">
              <label className="me-1" htmlFor="target">
                Target Date
              </label>
              <input
                type="date"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className="mx-3 d-flex flex-column">
              <label htmlFor="status" className="me-2">
                Status
              </label>
              <Select
                className="d-inline"
                options={options}
                defaultValue={{ value: "pending", label: "Pending" }}
                menuPlacement="top"
                onChange={(e) => setStatus(e.value)}
              />
            </div>
          </div>

          <button
            className="btn btn-primary mx-3 "
            // style={{ width: "10vw" }}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AbnormalityRecord;
