import React, { Fragment } from "react"; 
import AllMachineCard from "./AllMachineCard";
import { useDispatch } from 'react-redux';
import { setProcessData } from '../../redux/processData/processActions';
import Loading from "../Loading";

export default function AllMachineLine({ line, processList , counts  }) { 
 
  
  const dispatch = useDispatch();

  const handleClick = (processData) => {
    dispatch(setProcessData(processData)); 
  };

  let totalSum = Object.values(counts).reduce((acc, curr) => acc + curr, 0);

  return (
    <Fragment>
      <h3 className="mx-3 p-1 bg-info text-center ">{`${line} - ${totalSum}`}</h3>
      <div className="d-flex flex-wrap">
        {processList ?  processList
        .map((processNo) => {
             
          return (
            <AllMachineCard
              onClick={() => handleClick(processNo.processData)}
              processNo={processNo.processNo}
              key={processNo.processNo} 
              processData={processNo.processData}
             
            />
          );
        }) : <Loading/>}
      </div>
    </Fragment>
  );
}
 
