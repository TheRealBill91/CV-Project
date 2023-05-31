import React, { Component } from "react";
import "./styles/App.css";
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
        }}
      >
        <FormOverview />
      </div>
    );
  }
}
