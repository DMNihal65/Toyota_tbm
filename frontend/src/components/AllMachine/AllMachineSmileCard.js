import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import AllMachineSmileCardDetails from "./AllMachineCardDetails";
import axios from "axios";
import { toast } from "react-toastify";
import SmileCardModify from "../SmileCardModify";

export default function AllMachineSmileCard() {
  const [modify, setModify] = useState(false);
  const [image, setImage] = useState(null);
  const processData = useSelector((state) => state.processData.processData);
  const [page, setPage] = useState(1);
  const [list, setList] = useState();

  const idIndex = page - 1;

  const getMachineById = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/machine/${processData[idIndex].id}`
      );
      let data = response.data;
      console.log(data);
      await setList(data.data);
      console.log(list);
    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {
    getMachineById();
  }, [page, modify]);

  const changePage = () => {
    setPage(page + 1);
  };

  const changePageMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;

  const counts = processData.length;

  let disabledPrevious = page < 2 ? "disabled" : null;
  let disabledNext = page < counts ? null : "disabled";

  const modifyHandler = () => {
    setModify(!modify);
  };

  const deleteItem = (itemId) => {
    axios
      .delete(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/delete/${itemId}`
      )
      .then((result) => {
        console.log("deleted check item ");
        toast.success("deleted check item ");
      })
      .catch((err) => {
        console.log("error deleting check item ", err.message);
        toast.error("error deleting check item ");
      });
  };

  const deleteConfirmation = () => {
    if (window.confirm("Are you sure you want to Delete this item?")) {
      deleteItem(list._id);
    } else {
      // Do nothing!
    }
  };

  return (
    <Fragment>
      <div className="d-flex flex-wrap my-2">
        <div className="d-flex allign-middle">
          <button
            className={`btn btn-sm btn-info mx-2 ${disabledPrevious} `}
            onClick={changePageMinus}
          >
            <i
              className="bi bi-arrow-left-circle-fill px-1"
              style={{ fontSize: "1.1rem", color: "dark" }}
            ></i>{" "}
            {`Previous Page`}
          </button>
          <p>
            Page {page} of {counts}
          </p>
          <button
            className={`btn btn-sm btn-info mx-2 ${disabledNext}`}
            onClick={changePage}
          >
            {`Next page`}
            <i
              className="bi bi-arrow-right-circle-fill px-1"
              style={{ fontSize: "1.1rem", color: "dark" }}
            ></i>
          </button>
        </div>

     
        {level >= 20 && (
          <button className="btn btn-warning mx-2" onClick={modifyHandler}>
            <i
              className="bi bi-pencil"
              style={{ fontSize: "1rem", color: "dark" }}
            ></i>
            {modify ? " Back" : " Modify"}
          </button>
        )}

        {level >= 100 && (
          <button
            className="btn btn-danger"
            onClick={deleteConfirmation}
            // data-toggle="tooltip"
            // data-placement="top"
            title="Delete the entry"
          >
            <i
              className="bi bi-trash"
              style={{ fontSize: "1.3rem", color: "white" }}
            ></i>
            Delete
          </button>
        )}
      </div>
      {modify ? (
        <SmileCardModify list={list} image={image} setImage={setImage} />
      ) : list ? (
        <AllMachineSmileCardDetails list={list} />
      ) : (
        <div>No data found</div>
      )}
    </Fragment>
  );
}
