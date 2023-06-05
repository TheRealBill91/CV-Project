import React, { Component } from "react";
import uniqid from "uniqid";
import "../styles/GeneralInfo.css"

export class GeneralInfoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalData: {
        nameInput: {
          name: "",
        },
        emailInput: {
          email: "",
        },
        phoneInput: {
          phoneNum: "",
        },

        id: uniqid(),
      },
      generalDataArr: [],
      editMode: true,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.submitGeneralInfo = this.submitGeneralInfo.bind(this);
    this.editGeneralInfo = this.editGeneralInfo.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      generalData: {
        nameInput: {
          name: e.target.value,
        },
        emailInput: {
          ...this.state.generalData.emailInput,
        },
        phoneInput: {
          ...this.state.generalData.phoneInput,
        },
      },
    });
  }

  handleEmailChange(e) {
    this.setState({
      generalData: {
        nameInput: {
          ...this.state.generalData.nameInput,
        },
        emailInput: {
          email: e.target.value,
        },
        phoneInput: {
          ...this.state.generalData.phoneInput,
        },
      },
    });
  }

  handlePhoneNumChange(e) {
    this.setState({
      generalData: {
        nameInput: {
          ...this.state.generalData.nameInput,
        },
        emailInput: {
          ...this.state.generalData.emailInput,
        },
        phoneInput: {
          phoneNum: e.target.value,
        },
      },
    });
  }

  submitGeneralInfo(e) {
    e.preventDefault();

    this.setState((prevState) => {
      return {
        generalDataArr: this.state.generalDataArr.concat(
          this.state.generalData.nameInput.name,
          this.state.generalData.emailInput.email,
          this.state.generalData.phoneInput.phoneNum
        ),
        generalData: {
          nameInput: {
            name: "",
          },
          emailInput: {
            email: "",
          },
          phoneInput: {
            phoneNum: "",
          },

          id: uniqid(),
        },
        editMode: false,
      };
    });
  }

  editGeneralInfo() {
    this.setState({
      generalData: {
        nameInput: {
          name: this.state.generalDataArr[0],
          nameError: "",
        },
        emailInput: {
          email: this.state.generalDataArr[1],
          emailError: "",
        },
        phoneInput: {
          phoneNum: this.state.generalDataArr[2],
        },
      },
      generalDataArr: [],

      editMode: true,
    });
  }

  render() {
    const { generalData, generalDataArr, editMode } = this.state;

    if (editMode === true) {
      return (
        <EditView
          generalInput={generalData}
          handleNameChange={this.handleNameChange}
          handleEmailChange={this.handleEmailChange}
          handlePhoneNumChange={this.handlePhoneNumChange}
          submitGeneralInfo={this.submitGeneralInfo}
        />
      );
    } else if (editMode === false) {
      return (
        <ReadView
          generalData={generalDataArr}
          editGeneralInfo={this.editGeneralInfo}
        />
      );
    }
  }
}

export class EditView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      generalInput,
      handleNameChange,
      handleEmailChange,
      handlePhoneNumChange,
      submitGeneralInfo,
    } = this.props;

    return (
      <>
        <div style={{ marginBottom: "24px" }}>
          <form
            noValidate
            onSubmit={submitGeneralInfo}
            className="generalInfoForm"
          >
            <div className="fullName">
              <label>Enter full name:</label>
              <input
                placeholder="John Appleseed"
                type="text"
                name="fullName"
                value={generalInput.nameInput.name}
                onChange={handleNameChange}
              ></input>
            </div>

            <div className="email">
              <label>Enter your email address:</label>
              <input
                placeholder="JohnAppleseed@aol.com"
                name="email"
                type="email"
                value={generalInput.emailInput.email}
                onChange={handleEmailChange}
              ></input>
            </div>

            <div className="phoneNumber">
              <label>Enter your phone number:</label>
              <input
                placeholder="(495)-564-4034"
                type="tel"
                name="telephone"
                pattern="\(\d{3}\)\s\d{3}-\d{4}"
                value={generalInput.phoneInput.phoneNum}
                onChange={handlePhoneNumChange}
              ></input>
            </div>
            <button style={{ width: "70px" }} type="submit">
              Save
            </button>
          </form>
        </div>
      </>
    );
  }
}

class ReadView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { generalData, editGeneralInfo } = this.props;

    return (
      <>
        <div>
          <div className="fullName">
            <h2>Name</h2>
            <p>{generalData[0]}</p>
          </div>

          <div className="email">
            <h3>Email</h3>
            <p>{generalData[1]}</p>
          </div>

          <div className="phoneNumber">
            <h3>Phone Number</h3>
            <p>{generalData[2]}</p>
          </div>
          <button onClick={editGeneralInfo}>Edit</button>
        </div>
      </>
    );
  }
}
