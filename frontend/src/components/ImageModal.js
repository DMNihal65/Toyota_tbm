import React from "react";
import Modal from "react-bootstrap/Modal";
import "./raiseCard.css";
import "./trend.css";

function ModalForm({ showModal, setShowModal, image }) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="my-modal"
      contentClassName="modal-height"
    >
      <Modal.Header closeButton>
        <Modal.Title>Details / Image</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          height: "90%",
        }}
      >
        <div
          style={{ height: "100%", width: "100%" }}
          className="d-flex justify-content-center align-item-center "
          onClick={handleClose}
        >
          <img
            src={`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/assets/images/${image}`}
            alt="Photo Not loaded"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer><div my-1></div></Modal.Footer> */}
    </Modal>
  );
}

export default ModalForm;
