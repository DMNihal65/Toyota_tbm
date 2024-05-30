import React, { Component } from "react";
import axios from "axios";
import DatePickerInPut from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Button } from "react-bootstrap";
import Select from "react-select";


// const host = "localhost";
const host= "10.82.126.73";
const port = 5051;

// dummy data ************Start //
// var dummydata = {
//   partName:"sp1",
//   line:"l2",
//   op:"op20",
//   requiredDate:new Date("2022-03-18T05:00:00.000Z"),
//   deliveryDate:new Date("2022-03-19T05:00:00.000Z"),
//   status:"under dispatch"
// }

// dummy data ************End //

class InputSpareParts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partName: "",
      line: "",
      op: "",
      entryDate: new Date(),
      requiredDate: new Date(),
      deliveryDate: new Date(),
      status: null,
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  requiredDate = (day) => {
    this.setState({
      requiredDate: day,
    });
  };

  deliveryDate = (day) => {
    this.setState({
      deliveryDate: day,
    });
  };
  entryDate = (day) => {
    this.setState({
      entryDate: day,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://${host}:3001`, this.state)
      .then((response) => {
        if (response.data.dataStatus == "Saved") {
          this.props.updateState();
          this.setState({
            partName: "",
            line: "",
            op: "",
            entryDate: new Date(),
            requiredDate: new Date(),
            deliveryDate: new Date(),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  optionHandle = (e) => {
    this.setState({
      status: e.value,
    });
  };

  render() {
    const {
      partName,
      line,
      op,
      requiredDate,
      deliveryDate,
      status,
      entryDate,
    } = this.state;
    const options = [
      { value: "Waiting for quotation", label: "Waiting for quotation" },
      { value: "Under P.O preparation", label: "Under P.O preparation" },
      { value: "Under Fabrication", label: "Under Fabrication" },
      { value: "Under dispatch", label: "Under dispatch" },
    ];

    return (
      <div className="mb-4">
        <form className="m-3">
          <table>
            <thead>
              <tr>
                <th>
                  <label htmlFor="partName">Spare Part Name</label>
                </th>
                <th>
                  <label htmlFor="line">Line</label>
                </th>
                <th>
                  <label htmlFor="op">OP</label>
                </th>
                {/* <th>
                  <label htmlFor="entryDate">Entry Date</label>
                </th> */}
                <th>
                  <label htmlFor="requiredDate">Require Date</label>
                </th>
                <th>
                  <label htmlFor="deliveryDate">Delivery Date</label>
                </th>

                <th>
                  <label htmlFor="status">Status</label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    id="partName"
                    name="partName"
                    value={partName}
                    onChange={this.onChangeHandler}
                    className="form-control "
                    placeholder="Enter Spare Name"
                  />
                </td>
                <td>
                  <input
                    id="line"
                    name="line"
                    value={line}
                    onChange={this.onChangeHandler}
                    className="form-control"
                    placeholder="Enter Line Name"
                  />
                </td>
                <td><div class="input-group">
                  <div class="input-group-prepend input-group-text">OP</div>
                  <input
                    id="op"
                    name="op"
                    value={op}
                    onChange={this.onChangeHandler}
                    className="form-control"
                    placeholder="Enter OP number"
                  />
                  </div>
                </td>
                {/* <td>
                  <DatePickerInPut
                    className="mute"
                    id="entryDate"
                    name="entryDate"
                    value={entryDate}
                    onDayChange={this.entryDate}
                  />
                </td> */}
                <td>
                  <span className="form-control">
                    <DatePickerInPut
                      id="requiredDate"
                      name="requiredDate"
                      value={requiredDate}
                      onDayChange={this.requiredDate}
                      className="form-control"
                    />
                  </span>
                </td>

                <td>
                  <span className="form-control">
                    <DatePickerInPut
                      id="deliveryDate"
                      name="deliveryDate"
                      value={deliveryDate}
                      onDayChange={this.deliveryDate}
                      className="form-control"
                    />
                  </span>
                </td>

                <td>
                  <Select
                    options={options}
                    onChange={this.optionHandle}
                    // value={status}
                  />
                </td>
                <td className="ms-2">
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={this.onSubmitHandler}
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>        
      </div>
    );
  }
}

export default InputSpareParts;
