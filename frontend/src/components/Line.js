import React, { Fragment, useState } from "react";
import MachineCard from "./MachineCard";
import Loading from "./Loading";
import CardStatusGraphModel from "./CardStatusGraphModel";

function Line({ line, processNos, counts, dailyStatusDataLinewise }) {
  const [showGraphModal, setShowGraphModal] = useState(false);
  const resultData = {};
  dailyStatusDataLinewise = dailyStatusDataLinewise
    ? dailyStatusDataLinewise
    : [];
  dailyStatusDataLinewise.forEach((element) => {
    resultData[element.processNo] = {
      OK: element.result.OK,
      NG: element.result.NG,
    };
  }); 

  let totalSum = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
 

  return (
    <Fragment>
      <div className="d-flex bg-primary m-3 p-1 w-90 justify-content-between position-relative">
      <h3 style={{
            margin: "5px auto"
      }} className="text-white text-center ">{`${line} - ${totalSum}`}</h3>
      <button onClick={()=>setShowGraphModal(true)} className="btn btn-outline-light border-white" style={{
            position: "absolute",
            right: 0,
            marginRight: "5px"
      }}><i className="bi bi-graph-up-arrow h4"> Graph</i></button>
      </div>
      
      <div className="d-flex flex-wrap">
        { processNos ? processNos.map((processNo) => {
          return (
            <MachineCard
              processNo={processNo}
              key={processNo}
              line={line}
              count={counts[processNo]}
              resultData={resultData}
              OK={resultData[processNo] ? resultData[processNo].OK : 0}
              NG={resultData[processNo] ? resultData[processNo].NG : 0}
            />
          );
        }) : <Loading/>}
      </div>
      {
        showGraphModal && (
          <CardStatusGraphModel showModal={showGraphModal} setShowModal={setShowGraphModal} line={line} />
        )
      }
    </Fragment>
  );
}

export default Line;
