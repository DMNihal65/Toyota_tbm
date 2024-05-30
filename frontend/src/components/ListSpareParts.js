import React, { Component } from "react";
import axios from "axios";
import ItemSpareparts from "./ItemSpareparts";
import InputSpareParts from "./InputSpareParts";

class ListSpareParts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSpareParts: [],
      doc: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3001")
      .then((result) => {
        this.setState({
          listSpareParts: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateState = () => {
    axios
      .get("http://localhost:3001")
      .then((result) => {
        this.setState({
          listSpareParts: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { listSpareParts } = this.state;
    const thClass = ""; // "p-3 border border-black-50 text-light";
    const li = listSpareParts.map((item) => {
      return (
        <ItemSpareparts
          key={item._id}
          item={item}
          updateState={this.updateState}
        />
      );
    });
    return (
      <div>
      
      <h1 className="text-center p-2 bg-info">Spare parts Monitoring</h1>   
        <InputSpareParts updateState={this.updateState} />
        <hr />
        
        <h2 class="ms-3"> Current Status of Spare parts:</h2>
        
        <table class="m-3 w-75 table table-bordered table-sm table-hover text-light">
          {/* <table className="m-5 border border-black-50 text-light"> */}
          <thead>
            <tr>
              <th className={thClass}>Part Name</th>
              <th className={thClass}>Line</th>
              <th className={thClass}>OP</th>
              <th className={thClass}>Entry Date</th>
              <th className={thClass}>Required Date</th>
              <th className={thClass}>Delivery Date</th>
              <th className={thClass}>Status</th>
              <th className={thClass}></th>
              <th className={thClass}></th>
            </tr>
          </thead>
          <tbody>{li}</tbody>
        </table>
      </div>
    );
  }
}

export default ListSpareParts;
