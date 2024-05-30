import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAbnormality } from "../redux/abnormality/abnormalityActions";
import AbnormalityRecordUpdate from "./AbnormalityRecordUpdate";
import RaiseCardModal from "./RaiseCardModal";
import AbnormalityImageModal from "./AbnormalityImageModal";

function AbnormilityDoc({ item, fromDateSt, toDateSt }) {
  const {
    createdAt,
    line,
    processNo,
    checkItem,
    abnormality,
    countermeasure,
    spare,
    pic,
    targetDate,
    status,
    image,

    _id,
    pS
  } = item;

  var workDetail=""
  if(checkItem==null){
    workDetail=""
  }
  else{
    workDetail=checkItem.workDetail
  }
  
  const [showModal, setShowModal] = useState(false);
  const [showModalRaiseCard, setShowModalRaiseCard] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);

  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;
        
     

  const dispatch = useDispatch();
  const deleteItem = (itemId) => {
    axios
      .delete(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/abnormality/update/${itemId}`
      )
      .then((result) => {
        dispatch(getAbnormality(fromDateSt, toDateSt));
      })
      .catch((err) => {
        console.log("error deleting abnormality item ", err.message);
      });
  };

  const deleteConfirmation = () => {
    if (window.confirm("Are you sure you want to Delete this item?")) {
      deleteItem(_id);
    } else {
      // Do nothing!
    }
  };

  // console.log(users);
  {
    console.log("level", level);
  }
  return (
    <tr
      className={
        status === "complete"
          ? "bg-success"
          : status === "inprogress"
          ? "bg-warning"
          : "bg-light"
      }
    >
      <td>{createdAt.slice(0, 10)}</td>
      <td>{pS ==="P"? "Maint.":(pS==="S"?"Prod.":"")}</td>
      <td>{line}</td>
      <td>{processNo}</td>
      <td>{workDetail}</td>
      <td>{abnormality}</td>
      <td>{countermeasure}</td>
      <td>{spare}</td>

      <td>{pic}</td>
      <td>{targetDate ? targetDate.slice(0, 10) : null}</td>
      <td>{status.toUpperCase()}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => setShowModalImage(true)}
          title="Image"
        >
          <i
            className="bi bi-image"
            style={{ fontSize: "1.5rem", color: "white" }}
          ></i>
          Image
        </button>
      </td>

      {level >= 40 && (
        <td>
          <button
            className="btn btn-danger"
            onClick={deleteConfirmation}
            // data-toggle="tooltip"
            // data-placement="top"
            title="Delete the entry"
          >
            <i
              className="bi bi-trash"
              style={{ fontSize: "1.5rem", color: "white" }}
            ></i>
            Delete
          </button>
        </td>
      )}
      {level >= 20 && (
        <td>
          <button
            className="btn btn-warning"
            title="Update the entry"
            onClick={() => setShowModal(true)}
          >
            <i
              className="bi bi-pencil-square"
              style={{ fontSize: "1.5rem", color: "white" }}
            ></i>
            Update
          </button>
        </td>
      )}

      {level >= 100 && (
        <td>
          <button
            className="btn btn-warning"
            title="Raise Card"
            onClick={() => setShowModalRaiseCard(true)}
          >
            <i
              className="bi bi-files"
              style={{ fontSize: "1.5rem", color: "white" }}
            ></i>
            Raise_Card
          </button>
        </td>
      )}

      {showModal ? (
        <AbnormalityRecordUpdate
          showModal={showModal}
          setShowModal={setShowModal}
          id={_id}
          checkItem={checkItem._id}
          line={line}
          processNo={processNo}
          workDetail={workDetail}
          abnormality={abnormality}
          countermeasure={countermeasure}
          spare={spare}
          pic={pic}
          targetDate={targetDate}
          status={status}
          fromDateSt={fromDateSt}
          toDateSt={toDateSt}
          image={image}
        />
      ) : null}
      {showModalRaiseCard ? (
        <RaiseCardModal
          showModal={showModalRaiseCard}
          setShowModal={setShowModalRaiseCard}
          id={_id}
          checkItem={checkItem._id}
          line={line}
          processNo={processNo}
          workDetail={workDetail}
          abnormality={abnormality}
          countermeasure={countermeasure}
          spare={spare}
          pic={pic}
          targetDate={targetDate}
          status={status}
          image={image}
          pS={pS}
        />
      ) : null}

      {showModalImage ? (
        <AbnormalityImageModal
          showModal={showModalImage}
          setShowModal={setShowModalImage}
          image={image}
        />
      ) : null}
    </tr>
  );
}

export default AbnormilityDoc;
