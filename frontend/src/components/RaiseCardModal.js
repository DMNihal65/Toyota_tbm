import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./raiseCard.css";

function ModalForm({
  showModal,
  setShowModal,
  workDetail,
  checkItem,
  line,
  processNo,
  abnormality,
  image,
  pS
}) {
  const optionsCard = [
    { value: "white", label: "White Card" },
    { value: "red", label: "Red Card" },
  ];
  // const optionsStatus = [
  //   { label: "Pending", value: "pending" },
  //   { label: "Inprogress", value: "inprogress" },
  //   { label: "Complete", value: "complete" },
  // ];

  const [color, setColor] = useState("white");
  const [logo, setLogo] = useState("pending");

  const statusHandler = (e) => {
    setLogo(e.value);
    setStatus(e.value);
  };

  // const [isOpen, setIsOpen] = useState(true)
  const handleClose = () => {
    // setIsOpen(false)
    setShowModal(false);
  };
  // const handleSubmit = () => {};

  // let info = {};

  // const [searchParams] = useSearchParams();
  // for (const e of searchParams.entries()) {
  //   let [f, v] = e;
  //   info[f] = v;
  // }

  // const { line, processNo } = info;

  // const todayDate = new Date(Date.now());
  // const [date, setDate] = useState();
  // const [user, setUser] = useState();
  const auth = useSelector((state) => state.auth);

  const user = auth.user._id;

  const [abnormalityM, setAbnormalityM] = useState(abnormality);
  const [cardType, setCardType] = useState("white");
  // const [countermeasure, setCountermeasure] = useState("");
  // const [target, setTarget] = useState("");
  // const [pic, setPic] = useState("");
  // const [spare, setSpare] = useState("");
  const [status, setStatus] = useState("pending");

  // const [remarks, setRemarks] = useState();

  const cardTypeHandler = (e) => {
    setColor(e.value);
    setCardType(e.value);
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "complete", label: "Complete" },
  ];

  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/card/create`,
        {
          checkItem,
          user,
          abnormality: abnormalityM,
          cardType,
          line,
          processNo,
          status,
          image,
          pS
        }
        // , { withCredentials: true }
      )
      .then((result) => {
        toast.success("Saved Successfully");
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please fill Abnormility Details");
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton className={color}>
        <Modal.Title>Raise Card</Modal.Title>
      </Modal.Header>
      <Modal.Body className={color}>
        <div className={color}>
          <div className="d-flex flex m-3">
            <span className="mx-3">
              Line : <span className="h6">{line}</span>
            </span>
            <span className="mx-3">
              OP No : <span className="h6">{processNo}</span>
            </span>
            <span className="mx-3">
              Inspection Item : <span className="h6">{workDetail}</span>
            </span>
          </div>
          <form onSubmit={formHandler} className="form-group mx-3">
            <h6>Type</h6>
            <div className="h5 ">
              <Select
                options={optionsCard}
                defaultValue={{ label: "White Card", value: "white" }}
                onChange={cardTypeHandler}
              />
            </div>
            <label htmlFor="ab">Abnormility Details</label>
            <textarea
              className="form-control"
              type="text"
              id="ab"
              value={abnormalityM}
              onChange={(e) => setAbnormalityM(e.target.value)}
              placeholder="Entry to be Compulsory for saving the record"
            />
            {/* <label htmlFor="ac">Countermeasure</label>
              <textarea
                className="form-control"
                type="text"
                id="ac"
                value={countermeasure}
                onChange={(e) => setCountermeasure(e.target.value)}
              /> */}

            {/* <label htmlFor="spares">Spare Required</label>
              <input
                className="form-control"
                type="text"
                id="spares"
                value={spare}
                onChange={(e) => setSpare(e.target.value)}
              /> */}

            <div className="d-flex justify-content-betweem my-2">
              {/* <div className="me-3 d-flex flex-column">
                  <label className="me-1" htmlFor="pic">
                    PIC
                  </label>
                  <input
                    type="text"
                    id="pic"
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                  />
                </div> */}
              {/* <div className="mx-3 d-flex flex-column">
                  <label className="me-1" htmlFor="target">
                    Target Date
                  </label>
                  <input
                    type="date"
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                </div>                 */}
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="status" className="me-2">
                Status
              </label>
              <Select
                className="d-inline"
                options={options}
                defaultValue={{ value: "pending", label: "Pending" }}
                menuPlacement="top"
                onChange={statusHandler}
              />
            </div>
            <div className="d-flex flex-column my-1" style={{ height: "20vh" }}>
              <div className="statusImg">
                <img
                  src={`/${logo}.png`}
                  alt="status"
                  style={{ height: "20vh", width: "auto" }}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer className={color}>
        <Button variant="primary" type="submit" onClick={formHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForm;
