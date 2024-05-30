import React, { useEffect, useState, Fragment, useReducer } from "react";
// import FlowSmileCard from "./FlowSmileCard";
import { useDispatch, useSelector } from "react-redux";
import { getCheckItem } from "../redux/checkItem/checkItemsActions";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import SmileCardDetails from "./SmileCardDetails";
import SmileCardModify from "./SmileCardModify";
import axios from "axios";
import AbnormalityRecordModalForm from "./AbnormalityRecordModalForm";
import { toast } from "react-toastify";
import {setCheckedBy} from "../redux/checkedBy"
import JudgementHistoryModel from "./JudgementHistoryModel";

function SmileCard() {
  const [modify, setModify] = useState(false);
  const [image, setImage] = useState(null);
  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;

  

  // get query string from link
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [showJudgementHistoryModel, setShowJudgementHistoryModel] = useState(false)

  const filters = useSelector((state) => state.filters);
  let queryStr;
  if (filters.rS == null) {
    queryStr = `d=${filters.d}&w=${filters.w}&m=${filters.m}&y=${filters.y}&pS=${filters.pS}`;
  } else {
    queryStr = `d=${filters.d}&w=${filters.w}&m=${filters.m}&y=${filters.y}&pS=${filters.pS}&rS=${filters.rS}`;
  }

  let entryForQueryStr = `${filters.y}-${filters.m}-${filters.dt}`;
  for (const e of searchParams.entries()) {
    let [f, v] = e;
    queryStr = queryStr + "&" + f + "=" + v;
  }

  //use hooks
  const [page, setPage] = useState(1);

  let disabledPrevious = page < 2 ? "disabled" : null;

  const dispatch = useDispatch();
  const checkItems = useSelector((state) => state.checkItems);
  

  // const {checkedBy} = checkItems.checkItem.headCheckList[0] ? checkItems.checkItem.headCheckList[0] :""



  useEffect(() => {
    dispatch(getCheckItem(queryStr, page, entryForQueryStr));
  }, [
    dispatch,
    page,
    searchParams,
    filters,
    modify,
    entryForQueryStr,
    queryStr,
  ]);

  // unpack object
  const { loading, checkItem } = checkItems;


const checkedBy= useSelector(state=>state.checkedBy)
  const [checkedByCurrent, setCheckedByCurrent] = useState(checkedBy);


  let list = loading
    ? {}
    : checkItem.success
    ? checkItems.checkItem.headCheckList[0]
    : {};

  let totalCount = loading
    ? 0
    : checkItem.success
    ? checkItems.checkItem.totalCount
    : 0;
  let disabledNext = page < totalCount ? null : "disabled";
  const changePage = () => {
    setPage(page + 1);
  };
  const changePageMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
  }

  console.log(list._id);

  const checkedByHandler = (e) => {
    setCheckedByCurrent(e.target.value);
  };

  useEffect(()=>{
    dispatch( setCheckedBy(checkedByCurrent))
  },[checkedByCurrent])

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
            Page {page} of {totalCount}
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

        {auth.isAuthenticated && (
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i
              className="bi bi-record-btn pe-2"
              style={{ fontSize: "1rem", color: "dark" }}
            ></i>
            Record Abnormality
          </button>
        )}
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

        {level >= 10 && (
          <input
            type="text"
            className="mx-2"
            placeholder="Checked by"
            value={checkedByCurrent}
            onChange={checkedByHandler}
          />
        )}

          <button
            className="btn btn-success"
            onClick={() => setShowJudgementHistoryModel(true)}
            // data-toggle="tooltip"
            // data-placement="top"
            title="History"
          >
            Judgement History
          </button>
        
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {checkItem.success ? (
            modify ? (
              <SmileCardModify list={list} image={image} setImage={setImage} />
            ) : (
              <div>
                <SmileCardDetails
                  list={list}
                  image={image}
                  setImage={setImage}
                  setRecordAbnormalityShowModal={setShowModal}
                />
                {showModal ? (
                  <AbnormalityRecordModalForm
                    showModal={showModal}
                    setShowModal={setShowModal}
                    workDetail={list.workDetail}
                    itemId={list._id}
                  />
                ) : null}
                {
                  showJudgementHistoryModel && (
                    <JudgementHistoryModel showModal={showJudgementHistoryModel} setShowModal={setShowJudgementHistoryModel} checkItem={list._id}/>
                  )
                }
              </div>
            )
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}

export default SmileCard;
