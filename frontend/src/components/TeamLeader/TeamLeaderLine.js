import React, { Fragment } from "react";
import TeamLeaderCard from "./TeamLeaderCard";

export default function TeamLeaderLine({ line, processNos, counts  }) {
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
 

  return (
    <Fragment>
      <h3 className="mx-3 p-1 bg-info text-center ">{line}</h3>
      <div className="d-flex flex-wrap">
        {processNos.map((processNo) => {
          return (
            <TeamLeaderCard
              processNo={processNo}
              key={processNo}
              line={line}
              count={counts[processNo]}
              resultData={resultData}
              OK={resultData[processNo] ? resultData[processNo].OK : 0}
              NG={resultData[processNo] ? resultData[processNo].NG : 0}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

 
