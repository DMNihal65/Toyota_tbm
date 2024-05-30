import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import JudgementHistoryData from "./JudgementHistoryData";


function JudgementHistoryModel({ showModal, setShowModal, checkItem }) {

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
        <Modal.Title>Judgement History</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <JudgementHistoryData checkItem={checkItem} />
      </Modal.Body>
    </Modal>
  );
}

export default JudgementHistoryModel