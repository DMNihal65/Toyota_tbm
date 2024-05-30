import React from "react";

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [""] };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let newVal = event.target.value;
    let stateVal = this.state.value;

  

    stateVal.indexOf(newVal) === -1
      ? stateVal.push(newVal)
      : stateVal.length === 1
      ? (stateVal = [])
      : stateVal.splice(stateVal.indexOf(newVal), 1);

    this.setState({ value: stateVal });
  }

  // handleSubmit(event) {
  //   alert("Your favorite flavor is: " + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select
            multiple={true}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="" />
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}

export default FlavorForm;
