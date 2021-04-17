import React from "react";
import ReactDOM from "react-dom";
import Map from "./MapComponent";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendData: {},
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        Main Vineeth !!
        <Map />
      </div>
    );
  }
}

export default Main;
