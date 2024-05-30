import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../redux/card/cardActions";
import CardRecordUpdate from "./CardRecordUpdate";
import AbnormalityImageModal from "./AbnormalityImageModal";

function CardDoc({ item, fromDateSt, toDateSt }) {
  const {
    createdAt,
    line,
    processNo,
    checkItem,
    abnormality,
    cardType,
    image,

    // countermeasure,
    // spare,
    // pic,
    // targetDate,
    status,

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
  const [showModalImage, setShowModalImage] = useState(false);

  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;

  const dispatch = useDispatch();
  const deleteItem = (itemId) => {
    axios
      .delete(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/card/update/${itemId}`
      )
      .then((result) => {
        console.log("Card item deleted successfully");
        dispatch(getCards(fromDateSt, toDateSt));
      })
      .catch((err) => {
        console.log("error deleting Card item ", err.message);
      });
  };

  const deleteConfirmation = () => {
    if (window.confirm("Are you sure you want to Delete this item?")) {
      deleteItem(_id);
    } else {
      // Do nothing!
    }
  };

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
      <td>{cardType.toUpperCase()}</td>
      {/* <td>{countermeasure}</td>
      <td>{spare}</td>

      <td>{pic}</td>
      <td>{targetDate?targetDate.slice(0,10):null}</td> */}
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

      {level >= 100 && (
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
      {level >= 30 && (
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

      {showModal ? (
        <CardRecordUpdate
          showModal={showModal}
          setShowModal={setShowModal}
          id={_id}
          checkItem={checkItem._id}
          line={line}
          processNo={processNo}
          workDetail={workDetail}
          abnormality={abnormality}
          cardType={cardType}
          image={image}
          // countermeasure={countermeasure}
          // spare={spare}
          // pic={pic}
          // targetDate={targetDate}
          status={status}
          fromDateSt={fromDateSt}
          toDateSt={toDateSt}
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

export default CardDoc;
