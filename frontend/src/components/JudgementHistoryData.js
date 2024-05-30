import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import TrendGraph from "./TrendGraph";
import DatePicker from "react-date-picker";
import "./trend.css";

const JudgementHistoryData = ({checkItem , query={}, byData='no'}) => {

  const auth = useSelector((state) => state.auth);
  const role = auth.user ? auth.user.role : 0;
  const [cardList, setCardList] = useState([])

    useEffect(() => {
        axios.get(
          `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/dailyStatusByCheckItem?checkItem=${checkItem}&query=${query}&byData=${byData}`)
          .then((result) => {
            if (result.data.success) {
              setCardList(result.data.dailyStatusAll)
              console.log(result.data.dailyStatusAll);
            }
          })
          .catch((err) => {
            // console.log("error ", err);
            // toast.error(`Data could not be saved , ${err.message}`);
          });
    
      }, [])
    
      const verfifyToggle = (role, changed, id, setChanged) => {
        axios.put(
          `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dailyStatus/changeVerified?role=${role}&status=${!changed}&id=${id}`)
          .then((result) => {
            if (result.data.success) {
              console.log(result.data)
              setChanged(!changed)
            }
          })
          .catch((err) => {
            // console.log("error ", err);
            // toast.error(`Data could not be saved , ${err.message}`);
          });
      }
    
      const GetVerified = ({data}) => {
        const {role, status, id} = data
        const [changed, setChanged] = useState(status)
        console.log("status",status);
        return (
          <div style={{
            display:"flex"
          }}>
            {
              changed &&
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/></svg>
            </div>
            }
            <button onClick={() => verfifyToggle(role, changed, id, setChanged)}>
              {
                changed ? (
                  "Unverify"
                  
                ) : (
                  "Verify"
                )
              }
            </button>
          </div>
        )
      }
    
      const list = cardList.map((item) => {
        console.log(item);
    
        return (
          <tr>
            <td>{item.checkedAt.split("T")[0]}</td>
            <td>{item.result}</td>
            <td>{item.value}</td>
            <td>{item.remarks}</td>
            <td>{item.checkedBy}</td>
            <td>{new Date(item.checkedAt).toLocaleTimeString()}</td>
            <td>
              {
                role == "tl" ? (
                  <GetVerified data={{role, status: item.tl, id:item._id}} />
                ) : (
                  item.tl ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/></svg>
                  ) : "Not Verified"
                )
              }
            </td>
            <td>
              {
                role == "gl" ? (
                  <GetVerified data={{role, status: item.gl,tlstatus:item.tl, id:item._id}} />
                ) : (
                  item.gl ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"/></svg>
                  ) : "Not Verified"
                )
              }
            </td>
          </tr>
        );
      });

  return (
    <table className="m-3   table table-bordered table-sm table-hover text-dark ">
          {/* <table className="m-5 border border-black-50 text-light"> */}
          <thead>
            <tr>
              <th>Entry Date</th>
              <th>Result</th>
              <th>Value</th>
              <th>Remarks</th>
              <th>Checked By</th>
              <th>Checked At</th>
              <th>Team Lead</th>
              <th>Group Lead</th>
            </tr>

          </thead>

          <tbody>{list}</tbody>
        </table>
  )
}

export default JudgementHistoryData