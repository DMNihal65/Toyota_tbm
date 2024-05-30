import React, { useEffect, useState, Fragment } from "react"; 
import { useDispatch, useSelector } from "react-redux";  
import PendingSmileCardDetails from "./PendingSmileCardDetails";  
import axios from "axios"; 

export default function PendingSmileCard() { 
  const processData = useSelector((state) => state.processData.processData);
  const [page, setPage] = useState(1);
  const [list, setList] = useState();

  const idIndex = page - 1;

  const getMachineById = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/head/machine/${processData[idIndex].checkItem}`); 
      let data =  response.data;
      console.log(data)
      await setList(data.data)
      console.log(list)
    } catch (error) {
      console.error(error);
    }
  }; 

  useEffect(() => {
    getMachineById();
  } , [page]);

  

  const changePage = () => {
    setPage(page + 1);
  };

  const changePageMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const counts = processData.length; 

  let disabledPrevious = page < 2 ? "disabled" : null;
  let disabledNext = page < counts ? null : "disabled"; 

  return (
    <Fragment>
      <div className="d-flex flex-wrap my-2 ">
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
      {list ? (
        <PendingSmileCardDetails list={list}  entryFor={processData[idIndex].entryDates[0]}  />
      ) : (
        <div>No data found</div>
      )}
    </Fragment>
  );
}
