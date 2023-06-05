import React, { Component } from "react";
import "normalize.css"
import { FormOverview } from "./components/Form";
import uniqid from "uniqid";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "12px",
          padding: "12px"
        }}
      >
        <FormOverview />
      </div>
    );
  }
}
