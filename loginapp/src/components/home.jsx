import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return <h1>{this.props.fields["emailid"]}</h1>;
  }
}

export default Home;
