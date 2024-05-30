import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/smilecard.module.css";

function MachineCard(props) {
  const { processNo, line, count, OK, NG } = props;

  let statusColor = "";
  if (NG > 0) {
    statusColor = "rgba(255,0,0,.7)";
  } else if (OK === count) {
    statusColor = "rgba(0,255,0,.7)";
  } else {
    statusColor = "rgba(76,76,255)";
  }

  return (
    <Fragment>
      <Link
        to={`/checkList?line=${line}&processNo=${processNo}`}
        style={{ textDecoration: "none" }}
      >
        <div
          className={`card  mx-3 mb-3  ${styles.bg} ${styles.translate}`}
          style={{ width: "8vmax", backgroundColor: statusColor, color:"white" }}
        >
          <div className="card-header">
            <h6 className="text-center">{processNo} </h6>
          </div>
          <div className="m-auto">
            <i
              className="bi bi-file-easel-fill"
              style={{ fontSize: "3rem", color: "white" }}
            ></i>
          </div>
          <div className="card-footer">
            <div className="text-center">Total {count} </div>
            <div className="text-center">
              {" "}
              OK {OK} NG {NG}
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
}

export default MachineCard;
