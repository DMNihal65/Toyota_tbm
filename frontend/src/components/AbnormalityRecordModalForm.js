import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ModalForm({ showModal, setShowModal, workDetail, itemId }) {
  // const [isOpen, setIsOpen] = useState(true)
  const handleClose = () => {
    // setIsOpen(false)
    setShowModal(false);
  };

  const {pS} = useSelector(state=>state.filters)

  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState("");

  const selectedFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let info = {};

  const [searchParams] = useSearchParams();
  for (const e of searchParams.entries()) {
    let [f, v] = e;
    info[f] = v;
  }

  const { line, processNo } = info;

  const auth = useSelector((state) => state.auth);

  const user = auth.loading === false    
    ? auth.user._id
    : null;

  const [abnormality, setAbnormality] = useState("");
  const [countermeasure, setCountermeasure] = useState("");
  const [target, setTarget] = useState("");
  const [pic, setPic] = useState("");
  const [spare, setSpare] = useState("");
  const [status, setStatus] = useState("pending");
  // const [remarks, setRemarks] = useState();

  const options = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "complete", label: "Complete" },
  ];

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("_id", _id);
    formData.append("image", selectedFile);

    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/uploadImage`,
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
      <Modal.Header closeButton>
        <Modal.Title>Record Abnormility</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="d-flex flex me-3 mb-2 ">
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
            <label htmlFor="ab">
              <span className="text-danger">*</span>Abnormility Details
            </label>
            <textarea
              className="form-control"
              type="text"
              id="ab"
              value={abnormality}
              onChange={(e) => setAbnormality(e.target.value)}
              placeholder="Entry to be Compulsory for saving the record"
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
                  PIC
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
                onChange={(e) => setStatus(e.value)}
              />
            </div>

            {/* <hr></hr> */}
            <div className="d-flex  justify-content-between mt-2">
              {/* <div className="imgTagCol mx-1">Image :</div> */}
              <div className="secondCol ms-0">
                <div className="form-group">
                  <input
                    type="file"
                    id="uploadImage"
                    className="form-control"
                    onChange={selectedFileHandler}
                  />
                </div>
              </div>

              <button
                className="btn btn-outline-primary me-1 "
                onClick={uploadImage}
              >
                Save_Image
              </button>
            </div>
            {/* <div className="d-flex"> */}
            {/* <div className="me-2">Image Name:</div> */}
            <div className="my-2">
              <input
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image Name"
                disabled
              />
            </div>
            {/* </div> */}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={formHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForm;
