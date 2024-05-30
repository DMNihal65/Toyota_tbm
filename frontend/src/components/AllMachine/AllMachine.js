import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMachines } from "../../redux/machine/machineActions";

import AllMachineLine from "./AllMachineLine";
import Loading from "../Loading";


export default function AllMachine() {
  const dispatch = useDispatch();
  const machines = useSelector((state) => state.machines); 
 
  const filters = useSelector((state) => state.filters);
  
  

  let lineStr = filters.line === null ? '' : `&line=${filters.line}`
  let rSStr = filters.rS === null ? '' : `&rS=${filters.rS}`

  let queryStr = `&pS=${filters.pS}` + lineStr + rSStr;

  useEffect(() => {
    dispatch(getAllMachines(queryStr)); 
  }, [dispatch , filters , queryStr]);

  const { loading, machineData } = machines;  
  console.log(machineData)
  
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment >
         <div className="overflow-auto" style={{height:"85vh"}}>
          {machineData.success
            ? machineData.machineData.map((item, i) => {
                return (
                  <AllMachineLine                    
                    line={item.line}
                    processList={item.processList}
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
