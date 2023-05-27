import React, { Component } from "react";
import "./styles/App.css";
import { FormOverview } from "./components/Form";
import uniqid from "uniqid";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalData: {
        nameInput: "",
        emailInput: "",
        phoneInput: "",
        id: uniqid(),
      },
      generalDataArr: [],
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.submitGeneralInfo = this.submitGeneralInfo.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      generalData: {
        nameInput: e.target.value,
      },
    });
  }

  handleEmailChange(e) {
    this.setState({
      generalData: {
        emailInput: e.target.value,
      },
    });
  }

  handlePhoneNumChange(e) {
    this.setState({
      generalData: {
        phoneInput: e.target.value,
      },
    });
  }

  submitGeneralInfo(e) {
    e.preventDefault();
    this.setState({
      generalDataArr: this.state.generalDataArr.concat({
        name: this.state.nameInput,
        email: this.state.emailInput,
        phoneNumber: this.state.phoneInput,
      }),
      generalData: {
        nameInput: "",
        emailInput: "",
        phoneInput: "",
        id: uniqid(),
      },
    });
  }

  render() {
    const { generalData, generalDataArr } = this.state;
    return (
      <>
        <FormOverview
          generalData={generalDataArr}
          generalInput={generalData}
          handleNameChange={this.handleNameChange}
          handleEmailChange={this.handleEmailChange}
          handlePhoneNumChange={this.handlePhoneNumChange}
          submitGeneralInfo={this.submitGeneralInfo}
        ></FormOverview>
      </>
    );
  }
}
