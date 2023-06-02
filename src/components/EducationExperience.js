import React, { Component } from "react";
import uniqid from "uniqid";
import { parseISO, format, parse } from "date-fns";

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

      targetEducationObjID: uniqid(),
      id: uniqid(),
      educationDataArr: [],
      editMode: false,
      submitMode: true,
    };

    this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
    this.handleTitleOfStudyChange = this.handleTitleOfStudyChange.bind(this);
    this.handleStartDateOfStudy = this.handleStartDateOfStudy.bind(this);
    this.handleEndDateOfStudy = this.handleEndDateOfStudy.bind(this);
    this.submitEducationInfo = this.submitEducationInfo.bind(this);
    this.editEducationInfo = this.editEducationInfo.bind(this);
    this.formatStartDate = this.formatStartDate.bind(this);
    this.formatEndDate = this.formatEndDate.bind(this);
    this.addEducationExperience = this.addEducationExperience.bind(this);
    this.saveEducationItem = this.saveEducationItem.bind(this);
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

  formatStartDate(startDate) {
    if (startDate === "") {
      return startDate;
    } else {
      const dateObj = parseISO(startDate);
      const formattedDateObj = format(dateObj, "MM/dd/yyyy");
      return formattedDateObj;
    }
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

  formatEndDate(endDate) {
    if (endDate === "") {
      return endDate;
    } else {
      const dateObj = parseISO(endDate);
      const formattedDateObj = format(dateObj, "MM/dd/yyyy");
      return formattedDateObj;
    }
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
        educationDataArr: this.state.educationDataArr.concat({
          schoolName: this.state.schoolNameInput.schoolName,
          titleOfStudy: this.state.titleOfStudyInput.titleOfStudy,
          startDate: this.formatStartDate(
            this.state.dateOfStudyInput.startDate
          ),
          endDate: this.formatEndDate(this.state.dateOfStudyInput.endDate),
          id: uniqid(),
        }),
        schoolNameInput: {
          schoolName: "",
        },
        titleOfStudyInput: {
          titleOfStudy: "",
        },
        dateOfStudyInput: {
          startDate: "",
          endDate: "",
        },
        id: this.state.id,
        targetEducationObjID: this.state.targetEducationObjID,
        editMode: this.state.editMode,
        submitMode: false,
      };
    });
  }

  saveEducationItem(e) {
    e.preventDefault();
    this.setState({
      id: uniqid(),
      educationDataArr: this.state.educationDataArr.map((item) => {
        if (item.id === this.state.targetEducationObjID) {
          return {
            schoolName: this.state.schoolNameInput.schoolName,
            titleOfStudy: this.state.titleOfStudyInput.titleOfStudy,
            startDate: this.formatStartDate(this.state.dateOfStudyInput.startDate),
            endDate: this.formatEndDate(this.state.dateOfStudyInput.endDate),
            id: this.state.id,
          };
        } else {
          return item;
        }
      }),
      schoolNameInput: {
        schoolName: "",
      },
      titleOfStudyInput: {
        titleOfStudy: "",
      },
      dateOfStudyInput: {
        startDate: "",
        endDate: "",
      },
      editMode: false,
      targetEducationObjID: this.state.targetEducationObjID,
      submitMode: this.state.submitMode,
    });
  }

  addEducationExperience() {
    this.setState({
      schoolNameInput: {
        ...this.state.schoolNameInput,
      },
      titleOfStudyInput: {
        ...this.state.titleOfStudyInput,
      },
      dateOfStudyInput: {
        ...this.state.dateOfStudyInput,
      },
      id: uniqid(),
      targetEducationObjID: this.state.targetEducationObjID,
      educationDataArr: this.state.educationDataArr,
      editMode: this.state.editMode,
      submitMode: true,
    });
  }

  editEducationInfo(educationItem) {
    const targetEducationItem = this.state.educationDataArr.find((item) => {
      return item.id === educationItem.id;
    });

    const parsedStartDate = parse(
      targetEducationItem.startDate,
      "MM/dd/yyyy",
      new Date()
    );

    const parsedEndDate = parse(
      targetEducationItem.endDate,
      "MM/dd/yyyy",
      new Date()
    );

    this.setState({
      schoolNameInput: {
        schoolName: targetEducationItem.schoolName,
        /*  schoolNameError: "",
         schoolNameValid: true, */
      },
      titleOfStudyInput: {
        titleOfStudy: targetEducationItem.titleOfStudy,
        /*  titleOfStudyError: "",
         titleOfStudyValid: true, */
      },
      dateOfStudyInput: {
        startDate: format(parsedStartDate, "yyyy-MM-dd"),
        endDate: format(parsedEndDate, "yyyy-MM-dd"),
      },
      id: this.state.id,
      targetEducationObjID: targetEducationItem.id,
      educationDataArr: this.state.educationDataArr,
      editMode: true,
      submitMode: this.state.submitMode,
    });
  }

  render() {
    const {
      schoolNameInput,
      dateOfStudyInput,
      titleOfStudyInput,
      editMode,
      submitMode,
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
          saveEducationItem={this.saveEducationItem}
        ></EditView>
      );
    } else if (submitMode === true) {
      return (
        <SubmitView
          schoolNameInput={schoolNameInput}
          dateOfStudyInput={dateOfStudyInput}
          titleOfStudyInput={titleOfStudyInput}
          handleSchoolNameChange={this.handleSchoolNameChange}
          handleTitleOfStudyChange={this.handleTitleOfStudyChange}
          handleStartDateOfStudy={this.handleStartDateOfStudy}
          handleEndDateOfStudy={this.handleEndDateOfStudy}
          submitEducationInfo={this.submitEducationInfo}
        ></SubmitView>
      );
    }
    if (editMode === false && educationDataArr.length !== 0) {
      return (
        <ReadView
          educationDataArr={educationDataArr}
          addEducationExperience={this.addEducationExperience}
          editEducationInfo={this.editEducationInfo}
          formatStartDate={this.formatStartDate}
          formatEndDate={this.formatEndDate}
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
      saveEducationItem,
    } = this.props;

    return (
      <>
        <div style={{ marginBottom: "24px" }}>
          <form
            noValidate
            onSubmit={saveEducationItem}
            className="educationExperienceForm"
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

export class SubmitView extends Component {
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
            className="educationExperienceForm"
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
              Submit
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
    const {
      educationDataArr,
      editEducationInfo,
      formatStartDate,
      formatEndDate,
      addEducationExperience,
    } = this.props;

    /*   const formattedStartDate = formatStartDate(educationDataArr);
      const formattedEndDate = formatEndDate(educationDataArr); */

    return (
      <>
        <div className="readViewEduationContainer">
          <AddEducationButton
            educationDataArr={educationDataArr}
            addEducationExperience={addEducationExperience}
          />

          {educationDataArr.map((educationItem) => (
            <div className="readViewEducation" key={educationItem.id}>
              <div className="schoolName">
                <h2>School Name</h2>
                <p>{educationItem.schoolName}</p>
              </div>
              <div className="titleOfStudy">
                <h3>Title of Study</h3>
                <p>{educationItem.titleOfStudy}</p>
              </div>
              <div className="startDate">
                <h3>Start Date</h3>
                <p>{educationItem.startDate}</p>
              </div>
              <div className="endDate">
                <h3>End Date</h3>
                <p>{educationItem.endDate}</p>
              </div>
              <button
                style={{ width: "40%" }}
                onClick={() => editEducationInfo(educationItem)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class AddEducationButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { educationDataArr, addEducationExperience } = this.props;

    if (educationDataArr.length === 0) {
      return null;
    } else if (educationDataArr.length !== 0) {
      return (
        <>
          <button onClick={addEducationExperience}>Add more education</button>
        </>
      );
    }
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
