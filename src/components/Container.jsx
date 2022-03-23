import React, { Component } from "react";

export class Container extends Component {
  constructor(props) {
    super();
  }

  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default Container;
