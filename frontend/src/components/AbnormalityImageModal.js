import React from "react";
import Modal from "react-bootstrap/Modal";
import "./raiseCard.css";
import "./trend.css";

function ModalForm({ showModal, setShowModal, image }) {
  const handleClose = () => {
    setShowModal(false);
  };
  console.log("image : ", image);

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="my-modal"
      contentClassName="modal-height"
    >
      <Modal.Header closeButton>
        <Modal.Title>Abnormality Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ height: "100%", width: "100%" }}
          className="d-flex justify-content-center align-item-center"
        >
          <img
            src={`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/assets/abnormalityImage/${image}`}
            alt="Photo Not loaded"
            style={{ maxHeight: "65vh", maxWidth: "auto" }}
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default ModalForm;
