import React, { Component } from "react";
import uniqid from "uniqid";

export class GeneralInfoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalData: {
        nameInput: {
          name: "",
          nameError: "",
          nameInputValid: true,
        },
        emailInput: {
          email: "",
          emailError: "",
          emailInputValid: true,
        },
        phoneInput: {
          phoneNum: "",
          phoneError: "",
          phoneInputValid: true,
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
    this.validateNameInput = this.validateNameInput.bind(this);
    this.validateEmailInput = this.validateEmailInput.bind(this);
    this.validatePhoneInput = this.validatePhoneInput.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      generalData: {
        nameInput: {
          name: e.target.value,
          nameError: this.state.generalData.nameInput.nameError,
          nameInputValid: this.state.generalData.nameInput.nameInputValid,
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
          emailError: [],
          emailInputValid: true,
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
          phoneError: "",
          phoneInputValid: true,
        },
      },
    });
  }

  validateNameInput() {
    if (this.state.generalData.nameInput.name.length <= 0) {
      console.log("getting to length less than zero");
      console.log(this.state.generalData.nameInput.name);
      this.setState({
        generalData: {
          nameInput: {
            name: this.state.generalData.nameInput.name,
            nameError: "Please enter your name",
            nameInputValid: false,
          },
          emailInput: {
            ...this.state.generalData.emailInput,
          },
          phoneInput: {
            ...this.state.generalData.phoneInput,
          },
        },
      });
    } else if (this.state.generalData.nameInput.name.length >= 26) {
      this.setState({
        generalData: {
          nameInput: {
            name: this.state.generalData.nameInput.name,
            nameError: "Please enter a shorter name",
            nameInputValid: false,
          },
          emailInput: {
            ...this.state.generalData.emailInput,
          },
          phoneInput: {
            ...this.state.generalData.phoneInput,
          },
        },
      });
    } else {
      this.setState({
        generalData: {
          nameInput: {
            nameInput: this.state.generalData.nameInput.name,
            nameError: "",
            nameInputValid: true,
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
  }

  validateEmailInput() {
    if (this.state.generalData.emailInput.email.length <= 0) {
      this.setState((prevState) => {
        return {
          generalData: {
            nameInput: {
              ...prevState.generalData.nameInput,
            },
            emailInput: {
              email: prevState.generalData.emailInput.email,
              emailError: "Email address is required, you entered nothing",
              emailInputValid: false,
            },
            phoneInput: {
              ...prevState.generalData.phoneInput,
            },
          },
        };
      });
    } else if (
      !this.state.generalData.emailInput.email.match(
        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
      )
    ) {
      this.setState((prevState) => {
        console.log(
          "Email length:" + this.state.generalData.emailInput.email.length
        );
        return {
          generalData: {
            nameInput: {
              ...prevState.generalData.nameInput,
            },
            emailInput: {
              email: prevState.generalData.emailInput.email,
              emailError:
                "Enter an email address in the format of email@example.domain",
              emailInputValid: false,
            },
            phoneInput: {
              ...prevState.generalData.phoneInput,
            },
          },
        };
      });
    } else {
      this.setState((prevState) => ({
        generalData: {
          nameInput: {
            ...prevState.generalData.nameInput,
          },
          emailInput: {
            email: prevState.generalData.emailInput.email,
            emailError: "",
            emailInputValid: true,
          },
          phoneInput: {
            ...prevState.generalData.phoneInput,
          },
        },
      }));
    }
  }

  validatePhoneInput() {
    if (this.state.generalData.phoneInput.phoneNum.length <= 0) {
      this.setState((prevState) => {
        return {
          generalData: {
            nameInput: {
              ...prevState.generalData.nameInput,
            },
            emailInput: {
              ...prevState.generalData.emailInput,
            },
            phoneInput: {
              phoneNum: prevState.generalData.phoneInput.phoneNum,
              phoneError: "Phone number is required, you entered nothing",
              phoneInputValid: false,
            },
          },
        };
      });
    } else if (
      !this.state.generalData.phoneInput.phoneNum.match(
        /\(\d{3}\)\s\d{3}-\d{4}/
      )
    ) {
      this.setState((prevState) => {
        return {
          generalData: {
            nameInput: {
              ...prevState.generalData.nameInput,
            },
            emailInput: {
              ...prevState.generalData.emailInput,
            },
            phoneInput: {
              phoneNum: prevState.generalData.phoneInput.phoneNum,
              phoneError: "",
              phoneInputValid: true,
            },
          },
        };
      });
    } else {
      this.setState((prevState) => ({
        generalData: {
          nameInput: {
            ...prevState.generalData.nameInput,
          },
          emailInput: {
            ...prevState.generalData.emailInput,
          },
          phoneInput: {
            phoneNum: prevState.generalData.phoneInput.phoneNum,
            phoneError: "",
            phoneInputValid: true,
          },
        },
      }));
    }
  }

  submitGeneralInfo(e) {
    console.log("Before prevent default event");
    e.preventDefault();
    this.validateNameInput();
    this.validateEmailInput();
    this.validatePhoneInput();

    this.setState((prevState) => {
      if (!prevState.generalData.nameInput.nameInputValid) {
        console.log("getting to name input invalid");
        return;
      } else if (!prevState.generalData.emailInput.emailInputValid) {
        return;
      } else if (!prevState.generalData.phoneInput.phoneInputValid) {
        return;
      }
      console.log(
        "Name input valid?" + this.state.generalData.nameInput.nameInputValid
      );
      return {
        generalDataArr: this.state.generalDataArr.concat(
          this.state.generalData.nameInput.name,
          this.state.generalData.emailInput.email,
          this.state.generalData.phoneInput.phoneNum
        ),
        generalData: {
          nameInput: {
            name: "",
            nameError: "",
            nameInputValid: true,
          },
          emailInput: {
            email: "",
            emailError: "",
            emailInputValid: true,
          },
          phoneInput: {
            phoneNum: "",
            phoneError: "",
            phoneInputValid: true,
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
          nameInputValid: true,
        },
        emailInput: {
          email: this.state.generalDataArr[1],
          emailError: "",
          emailInputValid: true,
        },
        phoneInput: {
          phoneNum: this.state.generalDataArr[2],
          phoneError: "",
          phoneInputValid: true,
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
        <div>
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
                required
              ></input>
              <NameInputErrorMessage generalInput={generalInput} />
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
              <EmailInputErrorMessage generalInput={generalInput} />
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
              <PhoneInputErrorMessage generalInput={generalInput} />
            </div>
            <button style={{ width: "40vw" }} type="submit">
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

class NameInputErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { generalInput } = this.props;
    return (
      <>
        <span>{generalInput.nameInput.nameError}</span>
      </>
    );
  }
}

class EmailInputErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { generalInput } = this.props;
    return (
      <>
        <span>{generalInput.emailInput.emailError}</span>
      </>
    );
  }
}

class PhoneInputErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { generalInput } = this.props;
    return (
      <>
        <span>{generalInput.phoneInput.phoneError}</span>
      </>
    );
  }
}
