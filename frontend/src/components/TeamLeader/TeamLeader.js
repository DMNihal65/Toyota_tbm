import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyStatus } from "../../redux/dailyStatus/dailyStatusActions"; 
import Line from "../Line";
import Loading from "../Loading";

export default function TeamLeader() {
  const dispatch = useDispatch(); 
  const filters = useSelector((state) => state.filters);
  const dailyStatuses = useSelector((state) => state.dailyStatuses);
  
  

//   let lineStr = filters.line === null ? '' : `&line=${filters.line}`
//   let rSStr = filters.rS === null ? '' : `&rS=${filters.rS}` 
  let DailyStatusQueryStr = `entryFor=${filters.y}-${filters.m}-${filters.dt}&pS=${filters.pS}`;
  

  useEffect(() => { 
    dispatch(getDailyStatus(DailyStatusQueryStr)); 
  }, [dispatch, filters, DailyStatusQueryStr]);

  const { loading, dailyStatus } = dailyStatuses; 
  console.log(dailyStatus) 
 
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment >
         <div className="overflow-auto" style={{height:"75vh"}}>
          {dailyStatus.success
            ? dailyStatus.sortedDailyStatus.map((item, i) => {
                return (
                  <Line
                    
                    line={item.line}
                    processNos={item.processes}
                    counts={item.counts}
                    key={item.line}
                   
                  />
                );
              })
            : null}
            </div>
        </Fragment>
      )}
      
    </Fragment>
  );
} 
