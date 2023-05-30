import React, { Component } from "react";
import uniqid from "uniqid";

class EducationExperienceSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolNameInput: {
        schoolName: "",
        schoolNameError: "",
        schoolNameValid: true,
      },
      titleOfStudyInput: {
        titleOfStudy: "",
        titleOfStudyError: "",
        titleOfStudyValid: true,
      },
      dateOfStudyInput: {
        startDate: "",
        endDate: "",
      },

      id: uniqid(),
      educationDataArr: [],
      editMode: true,
    };

    this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
    this.handleTitleOfStudyChange = this.handleTitleOfStudyChange.bind(this);
    this.handleStartDateOfStudy = this.handleStartDateOfStudy.bind(this);
    this.handleEndDateOfStudy = this.handleEndDateOfStudy.bind(this);
    this.submitEducationInfo = this.submitEducationInfo.bind(this);
    this.editEducationInfo = this.editEducationInfo.bind(this);
  }

  handleSchoolNameChange(e) {
    this.setState({
      schoolNameInput: {
        schoolName: e.target.value,
        schoolNameError: this.state.schoolNameInput.schoolNameError,
        schoolNameValid: this.state.schoolNameInput.schoolNameValid,
      },
      titleOfStudyInput: {
        ...this.state.titleOfStudyInput,
      },
      dateOfStudyInput: {
        ...this.state.dateOfStudyInput,
      },
    });
  }

  handleTitleOfStudyChange(e) {
    this.setState({
      schoolNameInput: {
        ...this.state.schoolNameInput,
      },
      titleOfStudyInput: {
        titleOfStudy: e.target.value,
        titleOfStudyError: this.state.titleOfStudyInput.titleOfStudyError,
        titleOfStudyValid: this.state.titleOfStudyInput.titleOfStudyValid,
      },
      dateOfStudyInput: {
        ...this.state.dateOfStudyInput,
      },
    });
  }

  handleStartDateOfStudy(e) {
    this.setState({
      schoolNameInput: {
        ...this.state.schoolNameInput,
      },
      titleOfStudyInput: {
        ...this.state.titleOfStudyInput,
      },
      dateOfStudyInput: {
        startDate: e.target.value,
        startDateError: this.state.dateOfStudyInput.startDateError,
        startDateValid: this.state.dateOfStudyInput.startDateValid,
        endDate: this.state.dateOfStudyInput.endDate,
        endDateError: this.state.dateOfStudyInput.endDateError,
        endDateValid: this.state.dateOfStudyInput.endDateValid,
      },
    });
  }

  handleEndDateOfStudy(e) {
    this.setState({
      schoolNameInput: {
        ...this.state.schoolNameInput,
      },
      titleOfStudyInput: {
        ...this.state.titleOfStudyInput,
      },
      dateOfStudyInput: {
        startDate: this.state.dateOfStudyInput.startDate,
        startDateError: this.state.dateOfStudyInput.startDateError,
        startDateValid: this.state.dateOfStudyInput.startDateValid,
        endDate: e.target.value,
        endDateError: this.state.dateOfStudyInput.endDateError,
        endDateValid: this.state.dateOfStudyInput.endDateValid,
      },
    });
  }

  validateSchoolName() {
    if (this.state.schoolNameInput.schoolName.length <= 0) {
      this.setState({
        schoolNameInput: {
          schoolName: this.state.schoolNameInput.schoolName,
          schoolNameError: "Please enter your school name",
          schoolNameValid: false,
        },
        titleOfStudyInput: {
          ...this.state.titleOfStudyInput,
        },
        dateOfStudyInput: {
          ...this.state.dateOfStudyInput,
        },
      });
    } else if (this.state.schoolNameInput.schoolName.name.length >= 26) {
      this.setState({
        schoolNameInput: {
          schoolName: this.state.schoolNameInput.schoolName,
          schoolNameError: "Please enter a shorter school name",
          schoolNameValid: false,
        },
        titleOfStudyInput: {
          ...this.state.titleOfStudyInput,
        },
        dateOfStudyInput: {
          ...this.state.dateOfStudyInput,
        },
      });
    }
  }

  validateTitleOfStudy() {
    if (this.state.titleOfStudyInput.titleOfStudy.length <= 0) {
      this.setState((prevState) => {
        return {
          schoolNameInput: {
            ...prevState.schoolNameInput,
          },
          titleOfStudyInput: {
            titleOfStudy: prevState.titleOfStudyInput.titleOfStudy,
            titleOfStudyError:
              "Please enter the title of your study, you entered nothing",
            titleOfStudyValid: prevState.titleOfStudyInput.titleOfStudyValid,
          },
          dateOfStudyInput: {
            ...prevState.dateOfStudyInput,
          },
        };
      });
    } else if (this.state.titleOfStudyInput.titleOfStudy.length >= 22) {
      this.setState((prevState) => {
        return {
          schoolNameInput: {
            ...prevState.schoolNameInput,
          },
          titleOfStudyInput: {
            titleOfStudy: prevState.titleOfStudyInput.titleOfStudy,
            titleOfStudyError: "Please enter a shorter title of study",
            titleOfStudyValid: prevState.titleOfStudyInput.titleOfStudyValid,
          },
          dateOfStudyInput: {
            ...prevState.dateOfStudyInput,
          },
        };
      });
    }
  }

  submitEducationInfo(e) {
    e.preventDefault();
    this.validateSchoolName();
    this.validateTitleOfStudy();
    this.setState((prevState) => {
      if (
        !prevState.schoolNameInput.schoolNameValid ||
        !prevState.titleOfStudyInput.titleOfStudyValid
      ) {
        return;
      }
      return {
        educationDataArr: this.state.educationDataArr.concat(
          this.state.schoolNameInput.schoolName,
          this.state.dateOfStudyInput.startDate,
          this.state.dateOfStudyInput.endDate,
          this.state.titleOfStudyInput.titleOfStudy
        ),
        id: uniqid(),
        editMode: false,
      };
    });
  }

  editEducationInfo() {
    this.setState({
      schoolNameInput: {
        schoolName: this.state.educationDataArr[0],
      },
      dateOfStudyInput: {
        startDate: this.state.educationDataArr[1],
        endDate: this.state.educationDataArr[2],
      },
      titleOfStudyInput: {
        titleOfStudy: this.state.educationDataArr[3],
      },
    });
  }

  render() {
    const {
      schoolNameInput,
      dateOfStudyInput,
      titleOfStudyInput,
      editMode,
      educationDataArr,
    } = this.state;

    if (editMode === true) {
      return (
        <EditView
          schoolNameInput={schoolNameInput}
          dateOfStudyInput={dateOfStudyInput}
          titleOfStudyInput={titleOfStudyInput}
          handleSchoolNameChange={this.handleSchoolNameChange}
          handleTitleOfStudyChange={this.handleTitleOfStudyChange}
          handleStartDateOfStudy={this.handleStartDateOfStudy}
          handleEndDateOfStudy={this.handleEndDateOfStudy}
          submitEducationInfo={this.submitEducationInfo}
        ></EditView>
      );
    } else if (editMode === false) {
      return (
        <ReadView
          educationDataArr={educationDataArr}
          editEducationInfo={this.editEducationInfo}
        ></ReadView>
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
      schoolNameInput,
      dateOfStudyInput,
      titleOfStudyInput,
      handleSchoolNameChange,
      handleTitleOfStudyChange,
      handleStartDateOfStudy,
      handleEndDateOfStudy,
      submitEducationInfo,
    } = this.props;

    return (
      <>
        <div>
          <form
            noValidate
            onSubmit={submitEducationInfo}
            className="generalInfoForm"
          >
            <div className="schoolName">
              <label>Enter your school/University Name:</label>
              <input
                placeholder="Harvard"
                type="text"
                name="schoolName"
                value={schoolNameInput.schoolName}
                onChange={handleSchoolNameChange}
                required
              ></input>
              <NameInputErrorMessage generalInput={generalInput} />
            </div>

            <div className="titleOfStudy">
              <label>Enter your title of study</label>
              <input
                placeholder="B.S Economics"
                name="titleOfStudy"
                type="titleOfStudy"
                value={titleOfStudyInput.titleOfStudy}
                onChange={handleTitleOfStudyChange}
              ></input>
              <EmailInputErrorMessage generalInput={generalInput} />
            </div>

            <div className="startDate">
              <label>Enter the date you started</label>
              <input
                placeholder="07/06/2005"
                type="date"
                name="startDate"
                value={dateOfStudyInput.startDate}
                onChange={handleStartDateOfStudy}
              ></input>
              <PhoneInputErrorMessage generalInput={generalInput} />
            </div>

            <div className="endDate">
              <label>Enter the date you ended</label>
              <input
                placeholder="11/06/2005"
                type="date"
                name="endDate"
                value={dateOfStudyInput.endDate}
                onChange={handleEndDateOfStudy}
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
    const { educationDataArr, editEducationInfo } = this.props;

    return (
      <>
        <div>
          <div className="schoolName">
            <h2>Name</h2>
            <p>{educationDataArr[0]}</p>
          </div>

          <div className="titleOfStudy">
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
