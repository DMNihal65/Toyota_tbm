import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAbnormality } from "../redux/abnormality/abnormalityActions";
import { toast } from "react-toastify";

function ModalForm(props) {
  const {
    showModal,
    setShowModal,
    id,
    line,
    processNo,
    checkItem,
    workDetail,
    abnormality,
    countermeasure,
    targetDate,
    pic,
    spare,
    status,
    fromDateSt,
    toDateSt,
    image,
  } = props;
  console.log("image :", image);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowModal(false);
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [imageM, setImageM] = useState(image);

  const selectedFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const auth = useSelector((state) => state.auth);

  const user = auth.user._id

  const [abnormalityM, setAbnormalityM] = useState(abnormality);
  const [countermeasureM, setCountermeasureM] = useState(countermeasure);
  const [targetM, setTargetM] = useState(targetDate);
  const [picM, setPicM] = useState(pic);
  const [spareM, setSpareM] = useState(spare);
  const [statusM, setStatusM] = useState(status);

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
        setImageM(result.data.file.filename);
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
      .put(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/update/${id}`,
        {
          line,
          processNo,
          user,
          checkItem,
          abnormality: abnormalityM,
          countermeasure: countermeasureM,
          targetDate: targetM,
          pic: picM,
          spare: spareM,
          status: statusM,
          image: imageM,
        }
        // , { withCredentials: true }
      )
      .then((result) => {
        toast.success("Saved Successfully");
        console.log(result.data);
        setShowModal(false);
        dispatch(getAbnormality(fromDateSt, toDateSt));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please fill Abnormility Details");
      });
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Abnormility</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
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
            <label htmlFor="ab">Abnormility Details</label>
            <textarea
              className="form-control"
              type="text"
              id="ab"
              value={abnormalityM}
              onChange={(e) => setAbnormalityM(e.target.value)}
              placeholder="Entry to be Compulsory for saving the record"
            />
            <label htmlFor="ac">Countermeasure</label>
            <textarea
              className="form-control"
              type="text"
              id="ac"
              value={countermeasureM}
              onChange={(e) => setCountermeasureM(e.target.value)}
            />

            <label htmlFor="spares">Spare Required</label>
            <input
              className="form-control"
              type="text"
              id="spares"
              value={spareM}
              onChange={(e) => setSpareM(e.target.value)}
            />
            <div className="d-flex justify-content-betweem my-2">
              <div className="me-3 d-flex flex-column">
                <label className="me-1" htmlFor="pic">
                  PIC
                </label>
                <input
                  type="text"
                  id="pic"
                  value={picM}
                  onChange={(e) => setPicM(e.target.value)}
                />
              </div>
              <div className="mx-3 d-flex flex-column">
                <label className="me-1" htmlFor="target">
                  Target Date
                </label>
                <input
                  type="date"
                  id="target"
                  value={targetM}
                  onChange={(e) => setTargetM(e.target.value)}
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
                defaultValue={{ value: `${status}`, label: `${status}` }}
                menuPlacement="top"
                onChange={(e) => setStatusM(e.value)}
              />
            </div>

            <div className="d-flex justify-content-between mt-2">
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
                value={imageM}
                onChange={(e) => setImageM(e.target.value)}
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
