import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class ItemSpareparts extends Component {
  deleteItem = (id) => {
    axios
      .post("http://localhost:3001/del", { id: id })
      .then((response) => {
        if (response.status) {
          this.props.updateState();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const {
      partName,
      line,
      op,
      entryDate,
      requiredDate,
      deliveryDate,
      status,
      _id,
    } = this.props.item;

    const tdClass = ""; //"p-3 border border-black-50";

    return (
      <tr>
        <td className={tdClass}>{partName}</td>
        <td className={tdClass}>{line}</td>
        <td className={tdClass}>{op}</td>
        <td className={tdClass}>{moment(entryDate).format("ll")}</td>
        <td className={tdClass}>{moment(requiredDate).format("ll")}</td>
        <td className={tdClass}>{moment(deliveryDate).format("ll")}</td>
        <td className={tdClass}>{status}</td>

        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.deleteItem(_id)}
            // data-toggle="tooltip"
            // data-placement="top"
            title="Click to delete the entry"
          >
            Delete
          </button>
        </td>
        <td>
          <button>Update</button>
        </td>
      </tr>
    );
  }
}

export default ItemSpareparts;
