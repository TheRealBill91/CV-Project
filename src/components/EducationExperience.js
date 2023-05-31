import React, { Component } from "react";
import uniqid from "uniqid";

export class EducationExperienceSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolNameInput: {
        schoolName: "",
        schoolNameError: "",
        // schoolNameValid: true,
      },
      titleOfStudyInput: {
        titleOfStudy: "",
        titleOfStudyError: "",
        // titleOfStudyValid: true,
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
        // schoolNameValid: this.state.schoolNameInput.schoolNameValid,
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
        // titleOfStudyValid: this.state.titleOfStudyInput.titleOfStudyValid,
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
        endDate: this.state.dateOfStudyInput.endDate,
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
        endDate: e.target.value,
      },
    });
  }

  /* validateSchoolName() {
    if (this.state.schoolNameInput.schoolName.length <= 0) {
      this.setState((prevState) => ({
        schoolNameInput: {
          schoolName: prevState.schoolNameInput.schoolName,
          schoolNameError: "Please enter your school name",
          // schoolNameValid: false,
        },
        titleOfStudyInput: {
          ...prevState.titleOfStudyInput,
        },
        dateOfStudyInput: {
          ...prevState.dateOfStudyInput,
        },
      }));
    } else if (this.state.schoolNameInput.schoolName.length >= 26) {
      this.setState({
        schoolNameInput: {
          schoolName: this.state.schoolNameInput.schoolName,
          schoolNameError: "Please enter a shorter school name",
          // schoolNameValid: false,
        },
        titleOfStudyInput: {
          ...this.state.titleOfStudyInput,
        },
        dateOfStudyInput: {
          ...this.state.dateOfStudyInput,
        },
      });
    } else {
      this.setState({
        schoolNameInput: {
          schoolName: this.state.schoolNameInput.schoolName,
          schoolNameError: "",
          // schoolNameValid: true,
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
            titleOfStudyValid: false,
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
            titleOfStudyValid: false,
          },
          dateOfStudyInput: {
            ...prevState.dateOfStudyInput,
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          schoolNameInput: {
            ...prevState.schoolNameInput,
          },
          titleOfStudyInput: {
            titleOfStudy: prevState.titleOfStudyInput.titleOfStudy,
            titleOfStudyError: "",
            titleOfStudyValid: true,
          },
          dateOfStudyInput: {
            ...prevState.dateOfStudyInput,
          },
        };
      });
    }
  } */

  submitEducationInfo(e) {
    e.preventDefault();
    /*  this.validateSchoolName();
    this.validateTitleOfStudy(); */
    this.setState((prevState) => {
      /*  if (!prevState.schoolNameInput.schoolNameValid) {
        return;
      } else if (!prevState.titleOfStudyInput.titleOfStudyValid) {
        return;
      } */
      return {
        educationDataArr: this.state.educationDataArr.concat(
          this.state.schoolNameInput.schoolName,
          this.state.titleOfStudyInput.titleOfStudy,
          this.state.dateOfStudyInput.startDate,
          this.state.dateOfStudyInput.endDate
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
        /*  schoolNameError: "",
         schoolNameValid: true, */
      },
      titleOfStudyInput: {
        titleOfStudy: this.state.educationDataArr[1],
        /*  titleOfStudyError: "",
         titleOfStudyValid: true, */
      },
      dateOfStudyInput: {
        startDate: this.state.educationDataArr[2],
        endDate: this.state.educationDataArr[3],
      },

      educationDataArr: [],
      editMode: true,
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
        <div style={{ marginBottom: "24px" }}>
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
              {/* <SchoolInputErrorMessage schoolNameInput={schoolNameInput} /> */}
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
              {/*   <TitleOfStudyErrorMessage titleOfStudyInput={titleOfStudyInput} /> */}
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
    const { educationDataArr, editEducationInfo } = this.props;

    return (
      <>
        <div>
          <div className="schoolName">
            <h2>School Name</h2>
            <p>{educationDataArr[0]}</p>
          </div>

          <div className="titleOfStudy">
            <h3>Title of Study</h3>
            <p>{educationDataArr[1]}</p>
          </div>

          <div className="startDate">
            <h3>Start Date</h3>
            <p>{educationDataArr[2]}</p>
          </div>

          <div className="endDate">
            <h3>End Date</h3>
            <p>{educationDataArr[3]}</p>
          </div>
          <button onClick={editEducationInfo}>Edit</button>
        </div>
      </>
    );
  }
}

/* class SchoolInputErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { schoolNameInput } = this.props;
    return (
      <>
        <span>{schoolNameInput.schoolNameError}</span>
      </>
    );
  }
}

class TitleOfStudyErrorMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { titleOfStudyInput } = this.props;
    return (
      <>
        <span>{titleOfStudyInput.titleOfStudyError}</span>
      </>
    );
  }
}
 */